import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'blog test title',
  author: 'Scooby doo',
  url: 'http://jee.jee',
  likes: 5,
  user: '123456',
}

test('renders a blog without url and number of likes', () => {
  render(<Blog blog={blog} />)

  const titleAndAuthor = screen.getAllByText(`${blog.title} ${blog.author}`)
  expect(titleAndAuthor).toBeDefined()
  const blogUrl = screen.queryByText(`${blog.url}`)
  expect(blogUrl).toBeNull()
  const blogLikes = screen.queryByText(`likes ${blog.likes}`)
  expect(blogLikes).toBeNull()
})

test('shows url and likes after button click', async () => {
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const showBlogDetailsButton = screen.getByTestId('show-blog-details-button')
  await user.click(showBlogDetailsButton)
  expect(await screen.findByTestId('blog-url')).toBeTruthy()
  expect(await screen.findByTestId('blog-likes')).toBeTruthy()
})

test('tests that like button has been clicked twice', async () => {
  const mockLikeButtonClick = jest.fn()
  render(<Blog blog={blog} handleAddBlogLike={mockLikeButtonClick} />)

  const user = userEvent.setup()
  const showBlogDetailsButton = screen.getByTestId('show-blog-details-button')
  await user.click(showBlogDetailsButton)

  const blogLikeButton = screen.getByTestId('blog-like-button')
  await user.click(blogLikeButton)
  await user.click(blogLikeButton)
  expect(mockLikeButtonClick.mock.calls).toHaveLength(2)
})
