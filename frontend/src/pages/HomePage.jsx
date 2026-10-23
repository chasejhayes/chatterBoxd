import Login from "../components/Login"
import { Outlet, Link} from 'react-router-dom'
import { useState } from "react"
import axios from 'axios'

const Register = ({setShowRegisterForm}) => {

  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')

  function handleRegister(e){
    // post request
    e.preventDefault()

    let newUserReq = {
      username: newUsername,
      password: newPassword
    }
    axios.post(
      `/api/users`, newUserReq
    )
    .then(res => 
      console.log(res)
    )
    setNewPassword('')
    setNewUsername('')
    setShowRegisterForm(false)
    alert("User created! You may now log in")



    // end with: user created! You may now log in
  }

  return (
    <div>
          <div>
      <h2>Login</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>
            new username
            <input
              type="text"
              value={newUsername}
              onChange={({ target }) => setNewUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={newPassword}
              onChange={({ target }) => setNewPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>

      </form>
    </div>

    
      
    </div>
  )
}



const Home = ({ user, setUser, getToken, setUserId, viewLogout, setViewLogout, showLogin, setShowLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showRegisterForm, setShowRegisterForm] = useState(false)

function handleRegister(){
  if (showRegisterForm === true){
    return setShowRegisterForm(false)
  } else return setShowRegisterForm(true)
}

 
  return (
    <div id="body" className="homePage">
      <h1>Welcome to ChatterBOXD</h1>
      <button className="loginButton" onClick={handleRegister}>register</button>
      {showRegisterForm && <Register setShowRegisterForm={setShowRegisterForm} />}
      {<Login setShowLogin={setShowLogin} showLogin={showLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} user={user} setUser={setUser} getToken={getToken} setUserId={setUserId} viewLogout={viewLogout} setViewLogout={setViewLogout}/>}

      <div>
        <Link to="/aboutme">About Me</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Home
