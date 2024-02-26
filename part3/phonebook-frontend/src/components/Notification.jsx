const Notification = ({ message, typeOfMessage }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={typeOfMessage === 'error' ? 'error' : 'success'}>
      {message}
    </div>
  )
}

export default Notification
