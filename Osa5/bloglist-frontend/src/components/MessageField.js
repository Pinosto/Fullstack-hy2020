import React from 'react'
import './messageField.css'

const MessageField = ({ notification }) => (
    notification?.type &&
    <div className={notification.type}>
      {notification.message}
    </div>
)

export default MessageField
