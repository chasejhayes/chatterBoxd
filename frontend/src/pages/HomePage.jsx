import Login from "../components/Login"
import { Outlet, Link} from 'react-router-dom'
import { useState } from "react"

const Register = ({}) => {

  return (
    <div>
      
    </div>
  )
}



const Home = ({ user, setUser, getToken, setUserId, viewLogout, setViewLogout, showLogin, setShowLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
 


  // function handleShowLogin(){
  //   if(user){
  //     console.log("already logged in!")
  //     return setShowLogin(false)
  //   }
  //   return setShowLogin(true)
  // }

  // if no user then show login form
 
  return (
    <div id="body" className="homePage">
      <h1>Welcome to ChatterBOXD</h1>
      <button className="loginButton">register</button>
      {/* {<button className="loginButton" onClick={handleShowLogin}>login</button>} */}
      {<Login setShowLogin={setShowLogin} showLogin={showLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} user={user} setUser={setUser} getToken={getToken} setUserId={setUserId} viewLogout={viewLogout} setViewLogout={setViewLogout}/>}

      <div>
        <Link to="/aboutme">About Me</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Home
