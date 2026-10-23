import Login from "../components/Login"
import { Outlet, Link} from 'react-router-dom'
import { useState } from "react"

const Register = ({}) => {

  return (
    <div>
      
    </div>
  )
}



const Home = ({ user, setUser, getToken, setUserId }) => {
  const [showLogin, setShowLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleShowLogin(){
    return setShowLogin(true)
  }

  return (
    <div id="body" className="homePage">
      <h1>Welcome to ChatterBOXD</h1>
      <button class="loginButton">register</button>
      <button class="loginButton" onClick={handleShowLogin}>login</button>
      {showLogin && <Login showLogin={showLogin} setShowLogin={setShowLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} user={user} setUser={setUser} getToken={getToken} setUserId={setUserId}/>}

      <div>
        <Link to="/aboutme">About Me</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Home
