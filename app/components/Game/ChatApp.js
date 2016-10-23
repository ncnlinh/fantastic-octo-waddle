import React from 'react'

import { connect } from 'react-redux'
import io from 'socket.io-client'
let socket = io(`http://localhost:3000`)

import UsersList from './UsersList'
import MessageList from './MessageList'
import MessageForm from './MessageForm'
import KillForm from './KillForm'
import {
  Button,
  Panel,
  ListGroup,
  Col,
  Image,
  Row,
  ListGroupItem,
  FormGroup,
  ControlLabel,
  FormControl,
  Jumbotron
} from 'react-bootstrap'

const player1Name = 'Claire'
const player1Image = '/images/chinese-woman-player.png'
const player2Name = 'Hardy'
const player2Image = '/images/geek-guy-player.png'
const player3Name = 'Monty'
const player3Image = '/images/indian-girl-player.png'
const player4Name = 'Carlos'
const player4Image = '/images/rapper-guy-player.png'
const player5Name = 'Tom (You)'
const player5Image = '/images/redhead-guy-player.png'
const playerName = ['Claire', 'Hardy', 'Monty', 'Carlos', 'Tom']
const ThreeHalfShitHackIdontWannaTalkAbout = (props) => (
  <Col md={3}>
    <Row>
      <Col mdOffset={2} md={8}>
        {props.children}
      </Col>
    </Row>
  </Col>
)



class ChatApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {users: [], messages: [], text: '', user: null, died: false,
    roundInfo:{roundName: 'Before game'}}
    this._initialize = this._initialize.bind(this)
    this._messageRecieve = this._messageRecieve.bind(this)
    this._userJoined = this._userJoined.bind(this)
    this._userLeft = this._userLeft.bind(this)
    this._lynchLocked = this._lynchLocked.bind(this)
    this._roundEnd = this._roundEnd.bind(this)
    this._gameStart = this._gameStart.bind(this)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
    this.handleKill = this.handleKill.bind(this)
  }

  componentDidMount () {
    socket.on('init', this._initialize)
    socket.on('send:message', this._messageRecieve)
    socket.on('user:join', this._userJoined)
    socket.on('user:left', this._userLeft)
    socket.on('change:name', this._userChangedName)
    socket.on('game:lynchlocked', this._lynchLocked)
    socket.on('game:roundend', this._roundEnd)
    socket.on('game:start', this._gameStart)
  }


  updateSelection (i) {
    this.props.dispatch({type: 'UPDATE_SELECTION', payload: i})
  }
  updateGiftUrl (e) {
    this.props.dispatch({type: 'UPDATE_GIFT_URL', payload: e.target.value})
  }

  nextScreen () {
    this.props.dispatch({type: 'GAME_START', payload: true})
  }

  prevScreen () {
    this.props.dispatch({type: 'GAME_START', payload: false})
  }

  _initialize (data) {
    var {users, name} = data
    users = users.map(user => ({name: user}))
    this.setState({users, user: name})
  }

  _messageRecieve (message) {
    var {messages} = this.state
    messages.push(message)
    this.setState({messages})
  }

  _userJoined (data) {
    var {users, messages} = this.state
    var {name} = data
    users.push({name: name})
    messages.push({
      user: 'APPLICATION BOT',
      text: name + ' Joined'
    })
    this.setState({users, messages})
  }

  _userLeft (data) {
    var {users, messages} = this.state
    var {name} = data
    var index
    users = users.filter(user => user.name !== name)
    messages.push({
      user: 'APPLICATION BOT',
      text: name + ' Left'
    })
    this.setState({users, messages})
  }

  _lynchLocked (data) {
    var {users, messages} = this.state
    var {user, selection} = data
    messages.push({user: 'APPLICATION BOT', text: `${user} selected ${selection} to lynch`})
    users = users.map(user => {
      if (user.name === data.user) {
        user.selection = selection
      }
      return user
    })
    this.setState({users, messages})
  }

  lynch () {
    this.handleKill({
      selection: playerName[this.props.selection - 1]
    })
  }

  _gameStart (data) {
    console.log('GAME_STARTED')
    var {users, messages} = this.state
    var {roundName, session, day} = data
    this.setState({roundInfo: data})
    messages.push({user: 'APPLICATION BOT', text: `${roundName} started`})
    this.setState({users, messages})
  }

  _roundEnd (data) {
    console.log("GAME ENDED!")
    var {users, messages} = this.state
    messages.push({user: 'APPLICATION BOT', text: `${data.selection} were lynched`})
    users = users.map(user => {
      if (user.name === data.selection) {
        user.selection = null
        user.status = 'died'
      }
      return user
    })
    if (data.selection === this.state.user) {
      this.setState({died: true})
    }
    console.log(users)
    this.setState({users, messages})
  }

  handleMessageSubmit (message) {
    var {messages} = this.state
    messages.push(message)
    this.setState({messages})
    socket.emit('send:message', message)
  }

  handleKill (message) {
    var {users, messages} = this.state
    messages.push({user: 'APPLICATION BOT', text: `You selected ${message.selection} to lynch`})
    console.log(users)
    console.log(this.state.user)
    users = users.map(user => {
      if (user.name === this.state.user) {
        user.selection = message.selection
      }
      return user
    })
    this.setState({users, messages})
    socket.emit('game:lynchlocked', message)
  }
  render () {
    var rest = <div><Col md={2} />
        <Col md={6}>
          <Row>
            <MessageList
              messages={this.state.messages}
              title={this.state.roundInfo.roundName}
                      />
            <MessageForm
              onMessageSubmit={this.handleMessageSubmit}
              user={this.state.user}
              died={this.state.died}
                      />
          </Row>
        </Col>
        <Col md={4}>
          <Row>
            <UsersList
              users={this.state.users}
                      />
            <KillForm
              onMessageSubmit={this.handleKill}
              user={this.state.user}
              died={this.state.died}
                      />
          </Row>
        </Col>
        <Col md={2} /></div>
    return (
      <div>
      {this.state.roundInfo.roundName === "Night 1" ? <div>
        <div className='container-fluid'>
          <Jumbotron className='face_name'>
            <h1>Night 1</h1>
          </Jumbotron>
          <Panel>
            <ListGroup fill className='face_name'>
              <h1>
                Villagers
                <br />
                <small>
                Vote to kill one
                </small>
              </h1>

              <Row>
                <Col mdOffset={1} md={2}>
                  <Panel onClick={this.updateSelection.bind(this, 1)} className={this.props.selection == 1 ? 'glow' : ''}>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player1Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player1Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </Col>
                <Col mdOffset={2} md={2}>
                  <Panel onClick={this.updateSelection.bind(this, 2)} className={this.props.selection == 2 ? 'glow' : ''}>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player2Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player2Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </Col>
                <Col mdOffset={2} md={2}>
                  <Panel onClick={this.updateSelection.bind(this, 3)} className={this.props.selection == 3 ? 'glow' : ''}>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player4Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player4Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </Col>
              </Row>
            </ListGroup>

            <Col mdOffset={4} md={4} className='face_name'>
              <Button bsStyle='success' style={{width: '80%'}} onClick={this.lynch} >
              Vote to assasinate
              </Button>
            </Col>
          </Panel>
          {rest}
        </div>
      </div> : ''}
      {this.state.roundInfo.roundName === "Day 1" ? <div>
        <div className='container-fluid'>
          <Jumbotron className='face_name'>
            <h1>Day 1</h1>
          </Jumbotron>
          <Panel>
            <ListGroup fill className='face_name'>
              <h1>
                Players
                <br />
                <small>
                Vote to lynch one
                </small>
              </h1>

              <Row>

                <ThreeHalfShitHackIdontWannaTalkAbout>
                  <Panel onClick={this.updateSelection.bind(this, 1)} className={this.props.selection == 1 ? 'glow' : ''}>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player1Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player1Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </ThreeHalfShitHackIdontWannaTalkAbout>
                <ThreeHalfShitHackIdontWannaTalkAbout>
                  <Panel onClick={this.updateSelection.bind(this, 2)} className={this.props.selection == 2 ? 'glow' : ''}>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player2Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player2Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </ThreeHalfShitHackIdontWannaTalkAbout>
                <ThreeHalfShitHackIdontWannaTalkAbout>
                  <Panel onClick={this.updateSelection.bind(this, 3)} className={this.props.selection == 3 ? 'glow' : ''}>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player3Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player3Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </ThreeHalfShitHackIdontWannaTalkAbout>
                <ThreeHalfShitHackIdontWannaTalkAbout>
                  <Panel onClick={this.updateSelection.bind(this, 4)} className={this.props.selection == 4 ? 'glow' : ''}>
                    <ListGroup fill>
                      <ListGroupItem>
                        <Image responsive src={player4Image} />
                      </ListGroupItem>
                      <ListGroupItem className='face_name'>{player4Name}</ListGroupItem>
                    </ListGroup>
                  </Panel>
                </ThreeHalfShitHackIdontWannaTalkAbout>
              </Row>
            </ListGroup>

            <Col mdOffset={4} md={4} className='face_name'>
              <Button bsStyle='success' style={{width: '80%'}} onClick={this.nextScreen} >
              Vote to lynch
              </Button>
            </Col>
          </Panel>
          {rest}
        </div>
      </div> : ''}
      {this.state.roundInfo.roundName !== "Day 1" && this.state.roundInfo.roundName !== "Night 1" ? <div>
        <div className='container-fluid'>
          <Panel>
          {rest}
          </Panel>
        </div>
      </div> : ''}
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    gameStart: state.home.gameStart,
    totalPot: state.home.totalPot,
    playerPot: state.home.playerPot,
    giftUrlLink: state.home.giftUrlLink,
    selection: state.home.selection,
    amazon_card: state.home.amazon_card
  }
}

export default connect(mapStateToProps)(ChatApp)
