import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from './CreateBlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()

  const component = render(
    <CreateBlogForm addBlog={addBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(author, {
    target: { value: 'Testaaja Teppo' }
  })
  fireEvent.change(url, {
    target: { value: 'www.testiurl.fi' }
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
  expect(addBlog.mock.calls[0][0].author).toBe('Testaaja Teppo' )
  expect(addBlog.mock.calls[0][0].url).toBe('www.testiurl.fi' )
})