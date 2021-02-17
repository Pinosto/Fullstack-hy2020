import blogService from '../services/blogs'
import { addNotificationOk, addNotificationErr } from '../reducers/notificationReducer'


const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'UPDATE_LIKES':
    return state.map((blog) => (
      blog.id === action.data.id ? action.data : blog))
  case 'ADD_COMMENT':
    return state.map((blog) => (
      blog.id === action.data.id ? action.data : blog))
  case 'REMOVE_BLOG':
    return state.filter(blog =>
      blog.id!==action.data)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (newBlog) => {
  return async dispatch => {
    try{
      const responseBlog=await blogService
        .create(newBlog)
      dispatch({
        type: 'NEW_BLOG',
        data: responseBlog,
      })
      dispatch(addNotificationOk(`now new blog available, ${newBlog.title}`))
    }catch (e){
      dispatch(addNotificationErr('error with adding blog'))

    }
  }
}

export const updateLikes = (id, updatedBlog) => {
  return async dispatch => {
    const responseBlog=await blogService
      .update(id, updatedBlog)
    dispatch({
      type: 'UPDATE_LIKES',
      data:responseBlog,
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const responseBlog=await blogService
      .addComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data:responseBlog,
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    try{
      await blogService
        .remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data:id,
      })
    }catch (exception) {
      console.error(exception)
    }
  }
}

export default reducer