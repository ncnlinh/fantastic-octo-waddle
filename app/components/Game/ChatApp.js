import React from 'react'

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
} from 'react-bootstrap';

class ChatApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {users: [], messages: [], text: ''}
    this._initialize = this._initialize.bind(this)
    this._messageRecieve = this._messageRecieve.bind(this)
    this._userJoined = this._userJoined.bind(this)
    this._userLeft = this._userLeft.bind(this)
    this._lynchLocked = this._lynchLocked.bind(this)
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
  }

  _initialize (data) {
    var {users, name} = data
    users = users.map(user=>({name: user}))
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
    return (
      <div>
        <Col md={2} />
        <Col md={6}>
          <Row>
                <MessageList
                  messages={this.state.messages}
                      />
                <MessageForm
                  onMessageSubmit={this.handleMessageSubmit}
                  user={this.state.user}
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
                      />
          </Row>
        </Col>
        <Col md={2} />
      </div>
      )
  }
}

export default ChatApp
