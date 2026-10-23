import {useState} from 'react'
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

export default Register