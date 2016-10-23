import React from 'react'

class UsersList extends React.Component {
  render () {
    return (
      <div className='users'>
        <h3> Players </h3>
        <ul>
          {
            this.props.users.map((user, i) => {
              return (
                <li key={i}>
                  {user.name}{user.selection ? <span> picked <strong>{user.selection}</strong></span> : ''}
                  {user.status ? <span><strong> {user.status}</strong></span> : ''}
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
