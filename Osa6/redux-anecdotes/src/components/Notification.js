import React from 'react'
import { useSelector } from 'react-redux'
// import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notifications.notification)
 
  // const dispatch = useDispatch()
  // notification !== '' && setTimeout(() => { dispatch(removeNotification()) }, 5000);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification === undefined ? 'none' : ''
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification