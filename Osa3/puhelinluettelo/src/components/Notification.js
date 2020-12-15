import React from 'react'
import './notification.css'

function Notification({ message, inputMessage, deleteMessage,errorMessage }) {
    return (
        <div>
            {inputMessage && message ? <p className="message" >{message}</p> : <p>{inputMessage}</p>}
            {deleteMessage && deleteMessage ? <p className="delete">{deleteMessage}</p>:<p></p>}
            {errorMessage && errorMessage ? <p className="error">{errorMessage}</p>:<p></p>}
        </div>
    )
}

export default Notification
