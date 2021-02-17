import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import MessageField from './components/MessageField'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeLogin } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import NavBar from './components/NavBar'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import User from './components/User'
import NewBlog from './components/NewBlog'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeLogin())
    dispatch(initializeUsers())
  },[dispatch])

  return (
    <div className="container">
      <NavBar />
      <MessageField />
      <Switch>
        <Route path='/user'>
          <p>user {user?.username} stats</p>
        </Route>
        <Route path={'/users/id/'}>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route path='/blog/id/'>
          <Blog />
        </Route>
        <Route path='/'>
          <h2>Blogs</h2>
          <NewBlog />
          <Blogs />
        </Route>
      </Switch>
    </div>
  )
}

export default App