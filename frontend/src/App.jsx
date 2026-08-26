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



const MovieDisplay = ({ userMovies, deleteMovies, toggleFilter, filter }) => {

  let displayType = userMovies

  if (toggleFilter === true) {
    displayType = filter
    console.log(filter)
    console.log(displayType)
  }

  return (
    <div>
      <ul>
        {displayType.map((item) =>
          <li key={item.id}>
            <h2>{item.title} {item.rating}</h2>
            <p>Directed By: {item.director}</p>
            <h3>Description</h3>
            <p>{item.description}</p>
            <p>Average Rating: {item.averageRating}</p>
            <p>Reviews: {item.reviews}</p>
            <p>{item.review}{item.rating}</p>
            <button onClick={() => { deleteMovies(item.id) }}>Delete</button>
          </li>
        )}
      </ul>
    </div>
  )
}




const FilterDropdown = ({ userMovies, setFilter, toggleFilter, setToggleFilter }) => {
  function filterByRating(e) {

    let rating = Number(e.target.value)
    if (rating > 0) {
      setToggleFilter(true)
    } else if (rating === 0) {
      setToggleFilter(false)
    }
    let filtered = userMovies.filter((movie) => movie.rating === rating)
    console.log(filtered)
    console.log(toggleFilter)
    return setFilter(filtered)


  }
  return (
    <div>
      <select name="filter" id="filter" onChange={(e) => { filterByRating(e) }}>
        <option value="0">Select a filter</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  )
}

const SortDropdown = ({ toggleSort, setToggleSort, sort, setSort, setUserMovies, userMovies }) => {

  function handleSort(e) {
    let selected = e.target.value
    if (selected === "alphabetical") {
      setUserMovies(userMovies.toSorted((a, b) => a.title.localeCompare(b.title)))

    } else if (selected === "rating") {
      console.log("setting rating")
      return setUserMovies(userMovies.sort((a, b) => b.rating - a.rating))
    }
  }

  return (
    <div>
      <select name="sort" id="sort" onChange={(e) => { handleSort(e) }}>
        <option value="">Sort</option>
        <option value="alphabetical">Alphabetical</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  )
}


const Body_Right = ({ userMovies, deleteMovies, setCurrentId, setUserMovies, toggleFilter, setToggleFilter, filter, setFilter, toggleSort, setToggleSort, sort, setSort }) => (
  <div id="body_right">
    <div id="films_header">My Films</div>
    <div id="films_UI">
      <button>Add Films</button>
      <SortDropdown userMovies={userMovies} setUserMovies={setUserMovies}toggleSort={toggleSort} setToggleSort={setToggleSort} sort={sort} setSort={setSort} />
      <FilterDropdown userMovies={userMovies} setUserMovies={setUserMovies} toggleFilter={toggleFilter} setToggleFilter={setToggleFilter} filter={filter} setFilter={setFilter} />
    </div>
    <input type="search"></input>
    <MovieDisplay userMovies={userMovies} deleteMovies={deleteMovies} setCurrentId={setCurrentId} toggleFilter={toggleFilter} setToggleFilter={setToggleFilter} filter={filter} setFilter={setFilter} />
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


const Add_Films = ({ movies, showForm, setShowForm, onSubmit, newRating, setNewRating, newReview, setNewReview, setCurrentId, userMovies }) => {


  const handleShowForm = (id) => {
    if (userMovies.some((x) => x.id == id)) {
      return alert("Film already in list")
    } else {
      return setShowForm(true)
    }
  }
  const handleSetId = (e) => {
    let id = Number(e.target.value)
    setCurrentId(id)
    handleShowForm(id)
  }

  return (
    <div>
      <select name="movies" id="movies" onChange={(e) => { handleSetId(e) }}>
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
  const [userMovies, setUserMovies] = useState([{ id: 1, title: "The Blue Gardenia", director: "Fritz Land", releaseDate: 1953, description: "Deeply distraught...", averageRating: 0, reviews: [], rating: 9 },
  { id: 2, title: "Night and the City", director: "Jules Dassin", releaseDate: 1950, description: "Londoner Harry Fabian (Richard Widmark)...", averageRating: 0, reviews: [], rating: 4, review: "" },
  { id: 3, title: "Niagara", director: "Henry Hathaway", releaseDate: 1953, description: "Rose Loomis (Marilyn Monroe) and her older...", averageRating: 0, reviews: [], rating: 3},
 { id: 4, title: "Niagara", director: "Henry Hathaway", releaseDate: 1953, description: "Rose Loomis (Marilyn Monroe) and her older...", averageRating: 0, reviews: [], rating: 7}])
  const [showForm, setShowForm] = useState(false)
  const [newRating, setNewRating] = useState("")
  const [newReview, setNewReview] = useState("")
  const [currentId, setCurrentId] = useState("")
  const [toggleFilter, setToggleFilter] = useState(false)
  const [filter, setFilter] = useState('')
  const [toggleSort, setToggleSort] = useState(false)
  const [sort, setSort] = useState('')


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
    setCurrentId('')

  }

  function deleteMovies(id) {


    axios.delete(`http://localhost:3001/api/movies/${id}`)
      .then(() => {
        setUserMovies(userMovies.filter(item => item.id !== id))
      })
  }




  return (
    <div>
      <Header />
      <div id="body">
        <Profile_Header />
        <Add_Films movies={movies} setUserMovies={setUserMovies} userMovies={userMovies} showForm={showForm} setShowForm={setShowForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={addUserRatingAndReview} setCurrentId={setCurrentId} />
        <Body_Right userMovies={userMovies} deleteMovies={deleteMovies} setCurrentId={setCurrentId} setUserMovies={setUserMovies} toggleFilter={toggleFilter} setToggleFilter={setToggleFilter} filter={filter} setFilter={setFilter} toggleSort={toggleSort} setToggleSort={setToggleSort} sort={sort} setSort={setSort} />
      </div>
    </div>
  )

}

export default App
