import Login from "../components/Login"
import { Outlet, Link} from 'react-router-dom'
import { useState } from "react"

import Register from "../components/Register"


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
