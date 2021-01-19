import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import MessageField from './components/MessageField'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try{
      const returnedBlog = await blogService
        .create(blogObject)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
      messageWith(`now new blog available, ${returnedBlog.title}`)
    }catch (exception) {
      messageWith('error with adding blog', 'err')
    }
  }

  const updateLikes = async (id, blogObject) => {
    try {
      const updateBlog = await blogService
        .update(id, blogObject)
      const likes = updateBlog.likes
      setBlogs(blogs.map((blog) => (blog.id === id ? { ...blog, likes, } : blog)))
    } catch (exception) {
      messageWith('error with likes', 'err')
    }
  }

  const removeBlog = async (id) => {
    console.log(`testi remove ${id}`)
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id!==id))
    } catch (exception) {
      messageWith(`error with removing:  ${exception.response.data.error}`, 'err')
    }
  }

  const messageWith = (message, type = 'ok') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const blogform = () => (
    <Togglable id='blogForm' buttonLabel='new blog' ref={blogFormRef}>
      <CreateBlogForm addBlog={addBlog} />
    </Togglable>
  )
  const loginform = () => (
    <Togglable id='loginForm' buttonLabel='login' visibleTrue={true} >
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  const handleLogin = async (username, password) => {
    messageWith(`logging in with, ${username}`)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      messageWith('login succeeded')
    } catch (exception) {
      messageWith('wrong credentials', 'err')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    messageWith('logged out')
    setUser(null)
    window.localStorage.clear()
  }

  const blogsListing = () => (
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateLikes={updateLikes}
          removeBlog={removeBlog} />
      )
  )

  return (
    <div>
      <h2>blogs</h2>
      {notification !== null &&
        <MessageField notification={notification} />}
      {user === null ?
        loginform()
        :
        <div>
          <UserInfo user={user} handleLogout={handleLogout} />
          {blogform()}
        </div>
      }
      {blogsListing()}
    </div>
  )
}

export default App