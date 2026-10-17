import Login from "./Login"
import { Outlet, Link} from 'react-router-dom'
import { useState } from "react"



const Home = ({ user, setUser, getToken}) => {
  const [showLogin, setShowLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  return (
    <div id="body" className="homePage">
      <h1>Welcome to ChatterBOXD</h1>
      {showLogin && <Login showLogin={showLogin} setShowLogin={setShowLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} user={user} setUser={setUser} getToken={getToken}/>}

      <div>
        <Link to="/aboutme">About Me</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Home
