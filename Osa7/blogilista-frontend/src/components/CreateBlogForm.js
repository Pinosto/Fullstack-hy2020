import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'

const CreateBlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const createBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    dispatch(addBlog(blogObject))
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h3>Create new</h3>
      <Form onSubmit={createBlog}>
        <Form.Group controlId="formGroupTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Title"
            value={title}
            name="Title"
            onChange={handleTitleChange}/>
        </Form.Group>
        <Form.Group controlId="formGroupAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" placeholder="Author"
            value={author}
            name="Author"
            onChange={handleAuthorChange}/>
        </Form.Group>
        <Form.Group controlId="formGroupUrl">
          <Form.Label>Url</Form.Label>
          <Form.Control type="text" placeholder="Url"
            value={url}
            name="Url"
            onChange={handleUrlChange}/>
        </Form.Group>
        <Button id='create' type="submit">Create</Button>
      </Form>
    </div>
  )

}

export default CreateBlogForm
