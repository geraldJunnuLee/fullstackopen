import {
  useNotificationDispatch,
  useNotificationValue,
} from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  const dispatchNotification = useNotificationDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  setTimeout(() => {
    dispatchNotification({ type: 'REMOVE_NOTIFICATION' })
  }, 5000)

  if (!notification) return null

  return <div style={style}>{notification}</div>
}

export default Notification
