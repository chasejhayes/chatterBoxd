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

  const MovieDisplay = ({userMovies}) => {
    console.log(userMovies)
    
    return (
    <div>
      <ul>
        {userMovies.map((item) => 
        <li>
          <h2>{item.title}</h2>
          {/* <p>Directed By: {item.director}</p>
          <h3>Description</h3>
          <p>{item.description}</p>
          <p>Average Rating: {item.averageRating}</p>
          <p>Reviews: {item.reviews}</p> */}
        </li>
        )}
      </ul>
    </div>
  )
}


  const Body_Right = ({userMovies}) => (
    <div id="body_right">
          <div id="films_header">My Films</div>
          <div id="films_UI">
            <button>Add Films</button>
            <button>Sort By:</button>
            <button>Filter By Rating</button>
          </div>
          <input type="search"></input>
          <MovieDisplay userMovies={userMovies}/>
        </div>
  )

  const Add_Films = ({movies, setUserMovies, userMovies}) => {

    const handleAddFilms = (e) => {
      let id = Number(e.target.value);
      let newMovie = movies.find(movie => movie.id === id)
      return setUserMovies(...userMovies, newMovie)
    }


    return (
      <div>
        <select name="movies" id="movies" onChange={handleAddFilms}>
          {movies.map(item => 
            <option value={item.id}>{item.title}</option>
          )}
        </select>
      </div>
    )
  }


function App() {

  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([    {id:4, title: "Leave Her to Heaven", director: "John M. Stahl", releaseDate: 1945, description: "While on a train, writer Richard Harland (Cornel Wilde) strikes up a relationship with the gorgeous Ellen Berent (Gene Tierney). Ellen quickly becomes obsessed with Richard and abandons her fiancé, Russell Quinton (Vincent Price), to be with him. The couple rushes into marriage, with both of them caught up in romance and Richard intrigued by Ellen's intensity. Only after settling into marriage, however, does Richard realize that she is psychotically jealous and highly unstable.", averageRating: 0, reviews: []},
    {id:5, title: "The Maltese Falcon", director: "John Huston", releaseDate: 1941, description: "In this noir classic, detective Sam Spade (Humphrey Bogart) gets more than he bargained for when he takes a case brought to him by a beautiful but secretive woman (Mary Astor). As soon as Miss Wonderly shows up, trouble follows as Sam's partner is murdered and Sam is accosted by a man (Peter Lorre) demanding he locate a valuable statuette. Sam, entangled in a dangerous web of crime and intrigue, soon realizes he must find the one thing they all seem to want: the bejeweled Maltese falcon.", averageRating: 0, reviews: []}])

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
