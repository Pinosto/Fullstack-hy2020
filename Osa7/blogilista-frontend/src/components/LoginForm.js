import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleLogin = async (username, password) => {
    dispatch(login(username,password))
  }
  const handleLoginEvent =  (event) => {
    event.preventDefault()
    handleLogin(username,password)
    setUsername('')
    setPassword('')
    history.push('/')
  }

  return (
    <div>
      <Form onSubmit={handleLoginEvent}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            id='username'
            value={username}
            name="Username"
            onChange={handleUsernameChange}/>
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id='password'
            value={password}
            name="Password"
            onChange={handlePasswordChange}/>
        </Form.Group>
        <Button id='login-button' type="submit">Login</Button>
      </Form>
    </div>
  )
}

export default LoginForm
