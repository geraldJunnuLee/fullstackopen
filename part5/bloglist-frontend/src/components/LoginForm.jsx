import Notification from './Notification'

const loginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  loginErrorMessage,
}) => {
  return (
    <div id='login-form'>
      <h2>log in to application</h2>
      {loginErrorMessage && (
        <Notification message={loginErrorMessage} typeOfMessage='error' />
      )}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-button' type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

export default loginForm
