import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
        updateLikes={mockHandlerUpdateLikes}
        removeBlog={mockHandlerRemoveBlog}
      />
    )
  })

  const blog = {
    title: 'otsikko',
    author: 'kirjuri',
    url: 'www.osoite.fi',
    likes: 0,
  }
  const user = {
    name: 'nimi',
    username: 'kayttis',
  }
  const mockHandlerUpdateLikes = jest.fn()
  const mockHandlerRemoveBlog = jest.fn()

  test('renders title and author, not likes and url', () => {
    const divShowInfo = component.container.querySelector('.showInfo')
    const divHideInfo = component.container.querySelector('.hideInfo')

    expect(component.container).toHaveTextContent('otsikko')
    expect(component.container).toHaveTextContent('kirjuri')
    expect(divShowInfo).toHaveStyle('display: none')
    expect(divHideInfo).toBeVisible()
  })

  test('Show url and likes after clicking show more', () => {
    const divShowInfo = component.container.querySelector('.showInfo')
    const divHideInfo = component.container.querySelector('.hideInfo')
    const button = component.getByText('show more')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('www.osoite.fi')
    expect(divShowInfo).toBeVisible()
    expect(divHideInfo).toHaveStyle('display: none')
  })

  test('AddLike calls updateLikes', () => {
    const buttonShowMore = component.getByText('show more')
    fireEvent.click(buttonShowMore)
    const buttonAddLike = component.container.querySelector('.addLike')
    fireEvent.click(buttonAddLike)
    fireEvent.click(buttonAddLike)

    expect(mockHandlerUpdateLikes.mock.calls).toHaveLength(2)
  })
})