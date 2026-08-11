import axios from "axios"
import { useEffect, useState } from "react"
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

  const MovieDisplay = ({media}) => (
    <div>
      <ul>
        {media.map((item) => 
        <li>
          <h2>{item.title}</h2>
          <p>Directed By: {item.director}</p>
          <h3>Description</h3>
          <p>{item.description}</p>
          <p>Average Rating: {item.averageRating}</p>
          <p>Reviews: {item.reviews}</p>
        </li>
        )}
      </ul>
    </div>
  )


  const Body_Right = ({userMovies}) => (
    <div id="body_right">
          <div id="films_header">My Films</div>
          <div id="films_UI">
            <button>Add Films</button>
            <button>Sort By:</button>
            <button>Filter By Rating</button>
          </div>
          <input type="search"></input>
          <MovieDisplay media={userMovies}/>
        </div>
  )

  const Add_Films = ({movies, setUserMovies, userMovies}) => {

    const handleAddFilms = (e) => {
      const selectedValue = e.target.value
      return setUserMovies(selectedValue,...userMovies)
    }


    return (
      <div>
        <select name="movies" id="movies" onChange={handleAddFilms}>
          {movies.map(item => 
            <option value={item.title}>{item.title}</option>
          )}
        </select>
      </div>
    )
  }


function App() {

  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/movies')
      .then((response) => {
        console.log(response.data)
        setMovies(response.data)
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
        <Add_Films movies={movies} setUserMovies={setUserMovies} userMovies={userMovies}/>
        <Body_Right userMovies={userMovies}/>
      </div>
    </div>
  )

}

export default App
