import React from 'react'
import './notification.css'

const Notification=({notification}) =>{
    return (
        <div className='notification'>
            {notification}
        </div>
    )
}

export default Notification
