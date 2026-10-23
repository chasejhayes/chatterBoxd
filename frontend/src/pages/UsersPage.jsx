import axios from 'axios'
import { useState, useEffect } from 'react'

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
      <h1>All Users</h1>
      <div id="body" className='userList'>
       {allUsers.map((user) => (
        <li key={user.id}>{user.username}</li>
       ))}
      </div>
    </div>
  )
}

export default UsersPage