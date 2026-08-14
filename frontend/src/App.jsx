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
    return (
    <div>
      <ul>
        {userMovies.map((item) => 
        <li key={item.id}>
          <h2>{item.title}</h2>
          <p>Directed By: {item.director}</p>
          <h3>Description</h3>
          <p>{item.description}</p>
          <p>Average Rating: {item.averageRating}</p>
          <p>Reviews: {item.reviews}</p>
          <p>{item.review}</p>
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

  const Form_Popup = ({ showForm, onSubmit, newRating, setNewRating, newReview, setNewReview  }) => {
    if (showForm === true)
    return (
      <div>
       <dialog open>
          <form method="dialog" id="user_review" onSubmit={onSubmit}>
            <label>Review:
              <input value={newReview} onChange={(e) => setNewReview(e.target.value)}/>
            </label>
            <label>Rating:
              <input value={newRating} onChange={(e) => setNewRating(e.target.value)}/>
            </label>
            <button>Submit</button>
          </form>
        </dialog>
      </div>

    )
  }

  // formpopup only runs when 'true', onChange needs to change state to true/false

  const Add_Films = ({movies, setUserMovies, userMovies,showForm, setShowForm, onSubmit, newRating, setNewRating, newReview, setNewReview, setCurrentId}) => {

    const handleAddFilms = (e) => {
      let id = Number(e.target.value);
      let newMovie = movies.find(movie => movie.id === id)
      return userMovies.includes(newMovie)
      ? console.log('error')
      : setUserMovies([...userMovies, newMovie]), console.log("not working")
    }
    
    const handleShowForm = () => {
      return setShowForm(true)
    }
    const handleSetId = (e) => {
      let id = Number(e.target.value)
      console.log('working')
      return setCurrentId(id)
    }

    return (
      <div>
        <select name="movies" id="movies" onChange={(e) => {handleAddFilms(e); handleShowForm(); handleSetId(e)}}>
          {movies.map(item => 
            <option key={item.id} value={item.id}>{item.title}</option>
          )}
        </select>
        <Form_Popup showForm={showForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={onSubmit}/>
      </div>
    )
  }


function App() {

  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [newRating, setNewRating] = useState("")
  const [newReview, setNewReview] = useState("")
  const [currentId, setCurrentId] = useState("")

  useEffect(() => {
    axios.get('http://localhost:3001/api/movies')
      .then((response) => {
        setMovies(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

  function addUserRatingAndReview(){
    // e.preventDefault()
    let id = currentId;

    let patchRequest = 
    {
      rating: newRating,
      review: newReview,
    }

    axios.patch(
      `http://localhost:3001/api/movies/${id}`, patchRequest
    )
    .then(res => {
      console.log(res)
      console.log(userMovies)
      setUserMovies([...userMovies, res.data])
    })
  
  }

  


  return (
    <div>
      <Header />
      <div id="body">
        <Profile_Header />
        <Add_Films movies={movies} setUserMovies={setUserMovies} userMovies={userMovies} showForm={showForm} setShowForm={setShowForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={addUserRatingAndReview} currentId={currentId} setCurrentId={setCurrentId}/>
        <Body_Right userMovies={userMovies}/>
      </div>
    </div>
  )

}

export default App
