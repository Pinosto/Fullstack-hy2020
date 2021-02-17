import { createStore, combineReducers,applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
  users: usersReducer,
})

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))