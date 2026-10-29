import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Users = ({ allUsers, user }) => {


  const [friendButton, setFriendButton] = useState(() => {
    const saved = localStorage.getItem('friendButton')
    return saved !== null ? saved : '1Add friend'
  })
  

  const [isFriend, setIsFriend] = useState(false)

  useEffect(() => {
    localStorage.setItem('friendButton', friendButton)

  }, [friendButton])


  // user = logged in user
  // item = user displayed on the page(one being added or removed to friends list)


  const id = useParams().id
  const item = allUsers.find(n => n.id === id)
  if (!item) {
    return <div>Loading...</div>
  }

  // let friend;

  // allUsers.filter(n => n.id === user.id)[0].friends.some(friend => friend.username === item.username) ? friend = true : friend = false




  function handleAddOrRemoveFriend(item, user) {
    let patchReq
    if (isFriend === false) {
      patchReq = {
        action: "addFriend",
        username: item.username,
        userId: item.id
      }
      console.log('friend was added')
      setFriendButton("remove friend1")
      setIsFriend(true)
     
    } else if (isFriend === true) {
      patchReq = {
        action: "deleteFriend",
        username: item.username,
        userId: item.id
      }
      console.log('friend was deleted')
      setFriendButton("add friend1")
      setIsFriend(false)
    }


    axios.patch(
      `/api/users/${user.id}`,
      patchReq
    )

  }


  // function buttonText() {
  //   if (isFriend === true) {
  //     return 'remove friend'
  //   } else { return 'add friend' }
  // }







  return (
    <div id="body">
      <h1>{item.username}</h1>
      <ul>
        {item.rankings.map((ranking) =>
          <div key={ranking.id}>
            <h3>{ranking.movieId.map((movie) =>
              <Link to={`/movies/${movie.id}`} key={movie.id}>{movie.title}</Link>)}</h3>
            <li>Rank: {ranking.rating}</li>
            <li>Review: {ranking.review}</li>
          </div>
        )}
      </ul>
      <button onClick={() => handleAddOrRemoveFriend(item, user)} id='friendButton'>{friendButton}</button>
    </div>
  )
}


export default Users







  // const [isFriend, setIsFriend] = useState(   allUsers.filter(n => n.id === user.id)[0].friends.some(friend => friend.username === item.username) 
  // )


  // let loggedinUser = allUsers.filter(n => n.id === user.id)

  // console.log(loggedinUser[0].friends.some(friend => friend.username === item.username) )

  //  allUsers.filter(n => n.id === user.id)[0].friends.some(friend => friend.username === item.username) 
