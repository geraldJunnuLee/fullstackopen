const Button = ({ addLike }) => {
  return (
    <button
      className='blog-like-button'
      data-testid='blog-like-button'
      onClick={addLike}
    >
      like
    </button>
  )
}

export default Button
