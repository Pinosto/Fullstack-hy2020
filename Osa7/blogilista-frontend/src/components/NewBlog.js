import React,{ useRef } from 'react'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'

const NewBlog=() => {

  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  const blogform = () => (
    <Togglable id='blogForm' buttonLabel='New blog' ref={blogFormRef}>
      <CreateBlogForm />
    </Togglable>
  )

  return (
    <div>
      {user !== null &&
        <div>
          {blogform()}
        </div>
      }
    </div>
  )
}

export default NewBlog
