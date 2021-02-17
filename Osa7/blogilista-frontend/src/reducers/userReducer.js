import loginService from '../services/login'
import blogService from '../services/blogs'
import { addNotificationOk, addNotificationErr } from '../reducers/notificationReducer'


const reducer= (state= null, action ) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const initializeLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type:'LOGIN',
        data:user,
      })
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    dispatch(addNotificationOk(`logging in with, ${username}`))
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(addNotificationOk('login succeeded'))
      dispatch({
        type:'LOGIN',
        data:user,
      })
    } catch (exception) {
      dispatch(addNotificationErr('wrong credentials'))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch(addNotificationOk('logged out'))
    blogService.setToken(null)
    window.localStorage.clear()
    dispatch({
      type:'LOGOUT',
    })
  }
}

export default reducer