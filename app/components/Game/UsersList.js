import React from 'react'

class UsersList extends React.Component {
  render () {
    return (
      <div className='users'>
        <h3> Online Users </h3>
        <ul>
          {
            this.props.users.map((user, i) => {
              return (
                <li key={i}>
                  {user}
                </li>
                )
            })
          }
        </ul>
      </div>
      )
  }
}

export default UsersList
