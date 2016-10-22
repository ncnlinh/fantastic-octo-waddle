var jwt = require('jsonwebtoken')
var request = require('request')
var token = jwt.sign({
  api_key: '01cd196e-ba33-4c14-937f-7490910cdd32', // Replace this with the API Key provided by Modo
  iat: Math.floor(Date.now() / 1000)
},
    'YE/uM4XmFLemPAGgaCBY8qdjSZFzPJxyw/KsuGtmOyZqmpOmU6nSTfh7EuJbwbknMfndMCnnmDx+Voc5GT8J7g==', // Replace this with the Client Secret provided by Modo
  {
    algorithm: 'HS256'
  })

/**
 * POST modo/account/create
 */
exports.accountCreate = function (req, res, next) {
  var options = {
    url: 'https://hack.modoapi.com/1.0.0-dev/account/create',
    method: 'POST',
    headers: {
      'Authorization': 'Token ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }
  request(options, function (error, response, body) {
    if (error) {
      res.send(error)
    } else {
      res.send({
        ...JSON.parse(body)
      })
      console.log(response.statusCode)
      console.log(body)
    }
      // if (!error && response.statusCode == 200 && body.status_code == 1) {
      //     console.log(body) // API Response
      // }
  })
}
