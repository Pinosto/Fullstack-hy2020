import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleLoginEvent =  (event) => {
    event.preventDefault()
    handleLogin(username,password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleLoginEvent}>
        <div>
                    username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
                    password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>

    </div>
  )
}

export default LoginForm
