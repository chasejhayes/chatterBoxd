import axios from "axios"
import { useEffect } from "react"
import './style.css'

  const Header = () => (
    <div id="header">
      <div>ChatterBOXD</div>
      <div>My Profile</div>
      <div>All Films</div>
      <div>All Users</div>
      <div>
        <input type="search"></input>
      </div>
    </div>
  )

  const Profile_Header = () => (
    <div id="profile_header">
      <div id="image">Profile Image Here</div>
      <div>User Name</div> 
      <div>Total Films: 0</div>
      <div>Bio HERE</div>
      <button>Edit Bio</button> 
    </div>
  )

  const Body_Right = ({display}) => (
    <div id="body_right">
          <div id="films_header">My Films</div>
          <div id="films_UI">
            <button>Add Films</button>
            <button>Sort By:</button>
            <button>Filter By Rating</button>
          </div>
          <input type="search"></input>
          <div>{display}</div>
        </div>

  )


function App() {

  useEffect(() => {
    axios.get('http://localhost:3001/api/movies')
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])



  return (
    <div>
      <Header />
      <div id="body">
        <Profile_Header />
        <Body_Right />
      </div>
    </div>
  )

}

export default App
