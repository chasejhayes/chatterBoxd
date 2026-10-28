
import {Link} from 'react-router-dom'
import Users from '../components/Users'

const UsersPage = ({ allUsers }) => {



  return (
    <div>
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