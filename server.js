var express = require('express')
var path = require('path')
var logger = require('morgan')
var compression = require('compression')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var dotenv = require('dotenv')
var React = require('react')
var ReactDOM = require('react-dom/server')
var Router = require('react-router')
var Provider = require('react-redux').Provider
var exphbs = require('express-handlebars')
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
var moment = require('moment')
var request = require('request')
var sass = require('node-sass-middleware')
var webpack = require('webpack')
var config = require('./webpack.config')
// var server = http.createServer(app)
// Load environment variables from .env file
dotenv.load()

// ES6 Transpiler
require('babel-core/register')
require('babel-polyfill')

// Models
var User = require('./models/User')

// Controllers
var userController = require('./controllers/user')
var contactController = require('./controllers/contact')
var modoController = require('./controllers/modo')
// React and Server-Side Rendering
var routes = require('./app/routes')
var configureStore = require('./app/store/configureStore').default

var app = express()

var compiler = webpack(config)

mongoose.connect(process.env.MONGODB)
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.')
  process.exit(1)
})

var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifeq: function (a, b, options) {
      if (a === b) {
        return options.fn(this)
      }
      return options.inverse(this)
    },
    toJSON: function (object) {
      return JSON.stringify(object)
    }
  }
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('port', process.env.PORT || 3000)
app.use(compression())
app.use(sass({ src: path.join(__dirname, 'public'), dest: path.join(__dirname, 'public') }))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  req.isAuthenticated = function () {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (err) {
      return false
    }
  }

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated()
    User.findById(payload.sub, function (err, user) {
      req.user = user
      next()
    })
  } else {
    next()
  }
})

app.get('/ping', function (req, res, next) {
  res.send('pong')
})

app.post('/contact', contactController.contactPost)
app.put('/account', userController.ensureAuthenticated, userController.accountPut)
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete)
app.post('/signup', userController.signupPost)
app.post('/login', userController.loginPost)
app.post('/forgot', userController.forgotPost)
app.post('/reset/:token', userController.resetPost)
app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink)
app.post('/auth/facebook', userController.authFacebook)
app.get('/auth/facebook/callback', userController.authFacebookCallback)
app.post('/auth/google', userController.authGoogle)
app.get('/auth/google/callback', userController.authGoogleCallback)
app.post('/auth/twitter', userController.authTwitter)
app.get('/auth/twitter/callback', userController.authTwitterCallback)

app.post('/modo/people/create', modoController.peopleRegister)
app.post('/modo/card/create', modoController.cardCreate)
app.post('/modo/fund/create', modoController.fundCreate)
app.post('/modo/fund/deposit', modoController.fundDeposit)
app.post('/modo/vault/get_type_list', modoController.vaultGetTypeList)
app.post('/modo/vault/fetch', modoController.vaultFetch)
// React server rendering
app.use(function (req, res) {
  var initialState = {
    auth: { token: req.cookies.token, user: req.user },
    messages: {}
  }

  var store = configureStore(initialState)

  Router.match({ routes: routes.default(store), location: req.url }, function (err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Provider, { store: store },
        React.createElement(Router.RouterContext, renderProps)
      ))
      res.render('layouts/main', {
        html: html,
        initialState: store.getState()
      })
    } else {
      res.sendStatus(404)
    }
  })
})

// Production error handler
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.sendStatus(err.status || 500)
  })
}

var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})

var io = require('socket.io')(server)

var userNames = (function () {
  var names = {}

  var claim = function (name) {
    if (!name || names[name]) {
      return false
    } else {
      names[name] = true
      return true
    }
  }

  // find the lowest unused "guest" name and claim it
  var getGuestName = function () {
    var guestNames = ['Dummy', 'Monty', 'Claire', 'Hardy', 'Carlos', 'Tom']
    var name
    var nextUserId = 0

    do {
      name = guestNames[nextUserId]
      nextUserId += 1
    } while (!claim(name))

    return name
  }

  // serialize claimed names as an array
  var get = function () {
    var res = []
    for (var user in names) {
      res.push(user)
    }

    return res
  }

  var free = function (name) {
    if (names[name]) {
      delete names[name]
    }
  }

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  }
}())

var gameLogic = (function () {
  var locked = []
  var selected = []
  var session = 1 // 0 : night, 1 day
  var day = 0
  var pushSelection = function (data) {
    var user = data.user
    var selection = data.selection
    if (locked.indexOf(user) === -1) {
      locked.push(user)
      selected.push(selection)
    } else {
      selected[locked.indexOf(user)] = selection
    }
    console.log(locked)
    console.log(selected)
  }
  var getSelected = function () {
    return selected
  }
  var nextRound = function () {
    session = 1 - session
    if (session === 0) {
      day++
    }
    locked = []
    selected = []
    return {
      roundName: (session ? 'Day' : 'Night') + ' ' + day,
      session: session,
      day: day
    }
  }
  var restart = function () {
    session = 1
    day = 0
    locked = []
    selected = []
  }
  return {
    pushSelection: pushSelection,
    getSelected: getSelected,
    nextRound: nextRound,
    restart: restart
  }
}())

io.on('connection', function (socket) {
  console.log('a user connected')
  var name = userNames.getGuestName()
  console.log(userNames.get())
  if (userNames.get().length === 6) {
    var roundInfo = gameLogic.nextRound()
    io.sockets.emit('game:start', roundInfo)
  }
  // send the new user their name and a list of users
  socket.emit('init', {
    name: name,
    users: userNames.get().splice(1)
  })

  // notify other clients that a new user has joined
  socket.broadcast.emit('user:join', {
    name: name
  })

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', {
      user: name,
      text: data.text
    })
  })

  // validate a user's name change, and broadcast it on success
  socket.on('change:name', function (data, fn) {
    if (userNames.claim(data.name)) {
      var oldName = name
      userNames.free(oldName)

      name = data.name

      socket.broadcast.emit('change:name', {
        oldName: oldName,
        newName: name
      })

      fn(true)
    } else {
      fn(false)
    }
  })
  socket.on('game:killlocked', function (data) {
    socket.broadcast.emit('game:killlocked', {
      user: name,
      selection: data.selection
    })
    gameLogic.pushSelection({
      user: name,
      selection: data.selection
    })
    io.sockets.emit('game:roundend', {
      selection: data.name
    })
    var roundInfo = gameLogic.nextRound()
    io.sockets.emit('game:start', roundInfo)
  })
  // lock a selection
  socket.on('game:lynchlocked', function (data) {
    socket.broadcast.emit('game:lynchlocked', {
      user: name,
      selection: data.selection
    })
    gameLogic.pushSelection({
      user: name,
      selection: data.selection
    })
    var selected = gameLogic.getSelected()
    var names = userNames.get()
    function mode (array) {
      if (array.length === 0) {
        return null
      }
      var modeMap = {}
      var maxEl = array[0]
      var maxCount = 1
      for (var i = 0; i < array.length; i++) {
        var el = array[i]
        if (modeMap[el] == null) {
          modeMap[el] = 1
        } else {
          modeMap[el]++
        }
        if (modeMap[el] > maxCount) {
          maxEl = el
          maxCount = modeMap[el]
        }
      }
      return maxEl
    }
    if (selected.length === names.length - 1) {
      var result = mode(selected)
      io.sockets.emit('game:roundend', {
        selection: result
      })
      var roundInfo = gameLogic.nextRound()
      io.sockets.emit('game:start', roundInfo)
    }
  })

  socket.on('game:restart', function (data) {
    io.sockets.emit('game:restart', {
    })
    gameLogic.restart()
  })


  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    })
    userNames.free(name)
  })
})

module.exports = app
