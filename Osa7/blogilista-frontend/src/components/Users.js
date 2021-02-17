import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)
  const history = useHistory()

  const handleClick = ( id ) => () => (history.push(`/users/id/${id}`))

  return (
    <div>
      <h2>Registered users</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id} onClick={handleClick(user.id)}>
              <th>{user.name}</th>
              <th >{user.blogs.length}</th>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
