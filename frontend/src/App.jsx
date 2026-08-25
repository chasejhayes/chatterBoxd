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



const MovieDisplay = ({ userMovies }) => {
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


const Body_Right = ({ userMovies }) => (
  <div id="body_right">
    <div id="films_header">My Films</div>
    <div id="films_UI">
      <button>Add Films</button>
      <button>Sort By:</button>
      <button>Filter By Rating</button>
    </div>
    <input type="search"></input>
    <MovieDisplay userMovies={userMovies} />
  </div>
)

const Form_Popup = ({ showForm, onSubmit, newRating, setNewRating, newReview, setNewReview }) => {
  if (showForm === true)
    return (
      <div>
        <dialog open>
          <form method="dialog" id="user_review" onSubmit={onSubmit}>
            <label>Review:
              <input value={newReview} onChange={(e) => setNewReview(e.target.value)} />
            </label>
            <label>Rating:
              <input value={newRating} onChange={(e) => setNewRating(e.target.value)} />
            </label>
            <button>Submit</button>
          </form>
        </dialog>
      </div>

    )
}


const Add_Films = ({ movies, showForm, setShowForm, onSubmit, newRating, setNewRating, newReview, setNewReview, setCurrentId, userMovies, currentId }) => {

  
  const handleShowForm = (id) => {
  // if (currentId === 1) {
  //     return console.log(`current id is ${currentId} and is working`)
  //   }
  //   console.log(userMovies)
  //   return setShowForm(true)
    if (userMovies.some((x) => x.id == id)) {
      return alert("Film already in list")
    } else {
      console.log(`current id is ${currentId}`)
      return setShowForm(true)
    }
  }
  const handleSetId = (e) => {
    let id = Number(e.target.value)
    console.log(`id has been set to ${id}`)
    setCurrentId(id)
    console.log(currentId)
    handleShowForm(id)
  }

//  the problem is that userMovies isnt updated by the time 

  return (
    <div>
      <select name="movies" id="movies" onChange={(e) => { handleSetId(e)}}>
        <option value="">Please select a film</option>
        {movies.map(item =>
          <option key={item.id} value={item.id}>{item.title}</option>
        )}
      </select>
      <Form_Popup showForm={showForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={onSubmit} />
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

  function addUserRatingAndReview(e) {
    e.preventDefault()
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
        setUserMovies([...userMovies, res.data])
      })
    setNewRating("")
    setNewReview("")
    setShowForm(false)

  }




  return (
    <div>
      <Header />
      <div id="body">
        <Profile_Header />
        <Add_Films movies={movies} setUserMovies={setUserMovies} userMovies={userMovies} showForm={showForm} setShowForm={setShowForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={addUserRatingAndReview} currentId={currentId} setCurrentId={setCurrentId} />
        <Body_Right userMovies={userMovies} />
      </div>
    </div>
  )

}

export default App
