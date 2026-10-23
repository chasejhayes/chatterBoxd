import loginService from '../services/login'

// set userId


const Login = ({ setShowLogin, username, setUsername, password, setPassword, user, setUser, getToken, setUserId, setViewLogout}) => {

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      setViewLogout(true) 

      window.localStorage.setItem(
        'loggedMediaUser', JSON.stringify(user)
      )

      getToken(user.token)
      setUser(user)
      setUserId(user.userId)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (error){
      console.error(error)
    }
    // console.log('test')
    // if (user){ 
    //   console.log(user)
    //   setShowLogin(false) && setViewLogout(true) 
    // }
    // console.log('logging in with', username, password)
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>

      </form>
    </div>


  )
}

export default Login