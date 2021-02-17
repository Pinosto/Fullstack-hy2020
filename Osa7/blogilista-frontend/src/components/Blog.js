import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { updateLikes,removeBlog,addComment } from '../reducers/blogsReducer'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'


const Blog = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useRouteMatch('/blog/id/:id')?.params.id
  const blog= blogs.find(blog => blog.id === id)
  const [comment, setComment] = useState('')

  const handleUpdateLikes = () => {
    const { id, author, url, title } = blog
    const updatedBlog = {
      user: blog.user?.id || blog.user,
      likes: blog.likes + 1,
      title,
      author,
      url,
    }
    dispatch(updateLikes(id, updatedBlog))
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      dispatch(removeBlog(blog.id))
      history.push('/')
    }
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const createComment= (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, comment))
    setComment('')
  }

  return (
    <div >
      <h2>{blog?.title}</h2>
      <h3>{blog?.author}</h3>
      <a href={`https://${blog?.url}`} target='_blank' rel="noopener noreferrer" >{blog?.url}</a><br />
      likes:
      <span className='likes'>{blog?.likes} </span><Button className="btn btn-primary btn-sm" onClick={handleUpdateLikes}>+1 like</Button><br />
      {blog?.user instanceof Object && <div>
        added: {blog?.user.name}
      </div>
      }
      {blog?.user?.username === user?.username &&
          <div className="removeBlog">
            <Button className="btn btn-danger" onClick={handleRemoveBlog}>remove blog</Button>
          </div>
      }
      <h3>Comments</h3>
      <Form onSubmit={createComment}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="New comment"
            value={comment}
            name="Comment"
            onChange={handleCommentChange}/>
        </Form.Group>
        <Button type="submit">Add comment</Button>
      </Form>
      <ul>
        {blog?.comments.map(comment =>
          <li key={comment.id}>{comment.text}</li>
        )}
      </ul>
    </div>
  )

}

export default Blog
Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
  }),
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
  }),
}