import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, typeOfMessage }) => {
  if (message === null) {
    return null
  }
  return (
    <div id='error-message' className={typeOfMessage}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  typeOfMessage: PropTypes.string.isRequired,
}

export default Notification
