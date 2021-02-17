import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'

const UserInfo=({ user }) => {
  const dispatch = useDispatch()
  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default UserInfo
