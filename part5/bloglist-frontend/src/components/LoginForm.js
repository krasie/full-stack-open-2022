import PropTypes from 'prop-types';

const loginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
    <div>
      <form onSubmit={handleLogin}>
          <div>
            <div>
              <input type="text" 
              name="username" 
              placeholder="Username" 
              value={username} 
              onChange={handleUsernameChange}
              />
            </div>
            <div>
              <input type="password" 
              name="password" 
              placeholder="Password" 
              vulue={password} 
              onChange={handlePasswordChange}
              />
            </div>
            <button type="submit">Login</button>
          </div>
      </form>
    </div>  
  )

  loginForm.propTypes ={
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

  export default loginForm
  