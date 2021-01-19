import React from 'react'
import './blog.css'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'


const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const handleUpdateLikes = () => {
    const { id, author, url, title } = blog
    const updatedBlog = {
      user: blog.user?.id || blog.user,
      likes: blog.likes + 1,
      title,
      author,
      url,
    }
    updateLikes(id, updatedBlog)
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      removeBlog(blog.id)
    }
  }


  return (
    <div className="blog">
      {blog.title} {blog.author}
      <Togglable buttonLabel='show more' buttonlabel2='hide'>
        {blog.url}<br />
      likes:
        <span className='likes'>{blog.likes}</span><button className='addLike' onClick={handleUpdateLikes}>+1 like</button><br />
        {blog.user instanceof Object && <div>
          {blog.user.name}
        </div>
        }
        {blog.user?.username === user?.username &&
          <div className="removeBlog">
            <button className="removeButton" onClick={handleRemoveBlog}>remove blog</button>
          </div>
        }
      </Togglable>
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
  updateLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
  }),
}