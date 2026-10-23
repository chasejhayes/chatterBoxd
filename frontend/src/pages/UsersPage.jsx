import axios from 'axios'
import { useState, useEffect } from 'react'
import { Outlet, Link} from 'react-router-dom'
import Users from '../components/Users'

const UsersPage = () => {
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {

    axios.get('/api/users')
      .then((res) => {
        let userArr = []
        for (res of res.data) {
          userArr.push(res)
        }
        setAllUsers(userArr)

      })
  }, [])

console.log(allUsers)




  return (
    <div>
      <Users allUsers={allUsers} />
      <h1>All Users</h1>
      <div id="body" className='userList'>
       {allUsers.map((user) => (
        <li key={user.id}>
           <Link to={`/users/${user.id}`}>{user.username}</Link>
    
        
        </li>
       ))}
      </div>
    </div>
  )
}

export default UsersPage