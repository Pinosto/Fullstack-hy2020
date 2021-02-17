import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

const User = () => {
  const users = useSelector(state => state.users)
  const id = useRouteMatch('/users/id/:id')?.params.id
  const userById= users.find(user => user.id === id)
  return (
    <div>
      <h2>{userById?.name}</h2>
      <h4>Added blogs</h4>
      <ListGroup variant="flush">
        {userById?.blogs.map(blog =>
          <ListGroup.Item key={blog.id} action href={`/blog/id/${blog.id}`}>{blog.title}</ListGroup.Item>
          )}
      </ListGroup>
    </div>
  )
}

export default User
