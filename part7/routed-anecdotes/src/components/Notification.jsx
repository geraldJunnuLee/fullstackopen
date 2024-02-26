const Notification = ({ notification, setNotification }) => {
  setTimeout(() => {
    setNotification(null)
  }, 5000)
  return <div>{notification}</div>
}

export default Notification
