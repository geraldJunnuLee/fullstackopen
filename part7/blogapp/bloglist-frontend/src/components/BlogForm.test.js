import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('tests blog form correct functionality', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)
  const showBlogFormButton = screen.getByTestId('show-blog-form-button')
  await user.click(showBlogFormButton)

  const inputs = screen.getAllByRole('textbox')
  const createNewBlogButton = screen.getByTestId('create-new-blog-button')

  await user.type(inputs[0], 'This is the title')
  await user.type(inputs[1], 'Batman')
  await user.type(inputs[2], 'http:jotain/jotain')

  await user.click(createNewBlogButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('This is the title')
  expect(createBlog.mock.calls[0][0].author).toBe('Batman')
  expect(createBlog.mock.calls[0][0].url).toBe('http:jotain/jotain')
})
