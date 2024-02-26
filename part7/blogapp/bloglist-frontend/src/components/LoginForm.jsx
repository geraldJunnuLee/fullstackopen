import { Button, Box, TextField, Typography } from '@mui/material'

import Notification from './Notification'

const loginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  loginErrorNotification,
}) => {
  return (
    <Box id="login-form">
      <Typography variant="h2">log in to application</Typography>
      {loginErrorNotification && (
        <Notification
          message={loginErrorNotification.text}
          typeOfMessage={loginErrorNotification.typeOfMessage}
        />
      )}
      <form onSubmit={handleLogin}>
        <Box
          style={{ display: 'flex', alignItems: 'center', margin: '10px 0px' }}
        >
          <Typography style={{ marginRight: '5px' }}>username</Typography>
          <TextField
            required
            size="small"
            label="required"
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </Box>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Typography style={{ marginRight: '5px' }}>password</Typography>
          <TextField
            required
            size="small"
            label="required"
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </Box>
        <Button
          style={{ margin: '10px 0px' }}
          variant="contained"
          id="login-button"
          type="submit"
        >
          login
        </Button>
      </form>
    </Box>
  )
}

export default loginForm
