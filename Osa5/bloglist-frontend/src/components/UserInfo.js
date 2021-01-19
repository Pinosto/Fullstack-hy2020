import React from 'react'

function UserInfo({ user,handleLogout }) {
  return (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default UserInfo
