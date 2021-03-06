import React from 'react'
import Message from './Message'

class MessageList extends React.Component {
  render () {
    return (
      <div className='messages'>
        <h2> You are {this.props.user} - a {this.props.character}: </h2>
        {
                  this.props.messages.map((message, i) => {
                    return (
                      <Message
                        key={i}
                        user={message.user}
                        text={message.text}
                          />
                      )
                  })
              }
      </div>
      )
  }
}

export default MessageList
