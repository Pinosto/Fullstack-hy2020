import React from 'react'
import './messageField.css'
import { useSelector } from 'react-redux'

const MessageField = () => {
  const notifications = useSelector(state => state.notifications)
  if(notifications?.notification) {
    return(
      <div className={notifications.type}>
        {notifications.notification}
      </div>
    )
  }
  return(null)
}

export default MessageField