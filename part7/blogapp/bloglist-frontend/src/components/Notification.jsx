import React from 'react'
import PropTypes from 'prop-types'

import { Alert } from '@mui/material'

const Notification = ({ message, typeOfMessage }) => {
  if (message === null) {
    return null
  }
  return (
    <Alert severity="error" id="error-message" className={typeOfMessage}>
      {message}
    </Alert>
  )
}

Notification.propTypes = {
  typeOfMessage: PropTypes.string.isRequired,
}

export default Notification
