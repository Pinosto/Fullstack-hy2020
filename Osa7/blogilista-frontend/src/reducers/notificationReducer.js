const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_NOTIFICATION':
    state.timeOut!==undefined&&clearTimeout(state.timeOut)
    return action.data
  case 'REMOVE_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

export const addNotificationOk = (notification, time=5) => {
  return async dispatch => {
    const timeOut=setTimeout(() => { dispatch(removeNotification()) }, time*1000)
    dispatch({
      type: 'ADD_NOTIFICATION',
      data: {
        notification,
        timeOut,
        type:'ok',
      }
    })
  }
}
export const addNotificationErr = (notification, time=5) => {
  return async dispatch => {
    const timeOut=setTimeout(() => { dispatch(removeNotification()) }, time*1000)
    dispatch({
      type: 'ADD_NOTIFICATION',
      data: {
        notification,
        timeOut,
        type:'err',
      }
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}


export default reducer