import axios from "axios"
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import './style.css'
import Home from "./components/Home"
import useMovies from "./hooks/useMovies"



// const Home = ({ user, setUser, getToken}) => {
//   const [showLogin, setShowLogin] = useState(true)
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')


//   return (
//     <div id="body" className="homePage">
//       <h1>Welcome to ChatterBOXD</h1>
//       {showLogin && <Login showLogin={showLogin} setShowLogin={setShowLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} user={user} setUser={setUser} getToken={getToken}/>}

//       <div>
//         <Link to="/aboutme">About Me</Link>
//       </div>
//       <Outlet />
//     </div>
//   )
// }

const NotFound = () => (
  <div>404</div>
)

const AboutMe = () => {
  return (
    <div>Testing nested routes</div>
  )
}

const MoviesPage = ({ movies }) => {

  return (
    <div id="body">
      <ul>
        {movies.map((item) =>
          <li key={item.id}>
            <Link to={`/movies/${item.id}`}>{item.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}



const Movies = ({ movies }) => {
  const id = useParams().id
  const item = movies.find(n => n.id === id)

  if (!item) {
    return <div>Loading...</div>
  }
  console.log(item)

  return (
    <div id="body">
      <ul>
        <h2>{item.title}</h2>
        <p>Directed By: {item.director}</p>
        <h3>Description</h3>
        <p>{item.description}</p>
        <h4>Reviews</h4>
        <ul>
          {item.rankings.map((ranking) =>
            <li key={ranking.id}>
              <p>{ranking.rating}</p>
              <p>{ranking.review}</p>
            </li>)}
        </ul>
      </ul>
    </div>
  )
}

const UsersPage = () => {
  return (
    <div id="body">
      <p>User 1</p>
      <p>User 2</p>
      <p>User 3</p>
    </div>
  )
}

const UserProfile = ({ movies, user, setUser, token}) => {


  const [userMovies, setUserMovies] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [newRating, setNewRating] = useState("")
  const [newReview, setNewReview] = useState("")
  const [currentId, setCurrentId] = useState("")
  const [toggleFilter, setToggleFilter] = useState(false)
  const [filter, setFilter] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [searchArr, setSearchArr] = useState([])
  const [toggleSearch, setToggleSearch] = useState(false)

  useEffect(() => {

    axios.get('/api/rankings')
      .then((res) => {
        let userMov = []
        for (res of res.data) {
          res.username === user.username
            ? userMov.push(res)
            : res
        }
        setUserMovies(userMov)

      })
  }, [])




  function addUserRatingAndReview(e) {
    e.preventDefault()
    let id = currentId;
    console.log(token)
    // console.log(user.token)

    // let token = `Bearer: ${user.token}`


    const config = {
      headers: { Authorization: token }
    }
    console.log(user)


    let postRequest =
    {
      rating: newRating,
      review: newReview,
      movieId: id,
      username: user.username,
      userId: user.userId
    }

    axios.post(
      `/api/rankings/`, postRequest, config
    )
      .then(res => {
        console.log(user)

        if (userMovies.some(movie => movie.id === res.data.id)) {

          let updated = userMovies.map((movie) => {
            return movie.id == id
              ? res.data
              : movie
          })
          setUserMovies(updated)
        } else {
          setUserMovies([...userMovies, res.data])

        }
      })
    setNewRating("")
    setNewReview("")
    setShowForm(false)
    setCurrentId('')


  }

  function deleteMovies(id) {
    axios.delete(`/api/rankings/${id}`)
      .then(() => {
        setUserMovies(userMovies.filter(item => item.id !== id))
      })
  }


  return (
    <div>
      <div id="body">
        <Profile_Header />
        <Add_Films movies={movies} setUserMovies={setUserMovies} userMovies={userMovies} showForm={showForm} setShowForm={setShowForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={addUserRatingAndReview} setCurrentId={setCurrentId} />
        <Body_Right user={user} userMovies={userMovies} deleteMovies={deleteMovies} setCurrentId={setCurrentId} setUserMovies={setUserMovies} toggleFilter={toggleFilter} setToggleFilter={setToggleFilter} filter={filter} setFilter={setFilter} setShowForm={setShowForm} onSubmit={addUserRatingAndReview} newRating={newRating} newReview={newReview} setNewRating={setNewRating} setNewReview={setNewReview} searchArr={searchArr} setSearchArr={setSearchArr} searchValue={searchValue} setSearchValue={setSearchValue} toggleSearch={toggleSearch} setToggleSearch={setToggleSearch} />
      </div>
    </div>
  )

}





const Profile_Header = () => (
  <div id="profile_header">
    <div id="image">Profile Image Here</div>
    <div>User Name</div>
    <div>Total Films: 0</div>
    <div>Bio HERE</div>
    <button>Edit Bio</button>
  </div>
)



const MovieDisplay = ({ user, userMovies, deleteMovies, toggleFilter, filter, showForm, setShowForm, onSubmit, newRating, setNewRating, newReview, setNewReview, setCurrentId, toggleSearch, searchArr }) => {

  let displayType = userMovies



  function handleShowForm(id) {
    setCurrentId(id)
    return setShowForm(true)
  }



  if (toggleFilter === true) {
    displayType = filter

  }
  if (toggleSearch === true) {
    displayType = searchArr

  }


  // Need to display the rankings and they each have a delete button
  // rankings need to hold both userID/rankingID/username
  // the delete request needs to send the userID and the ranking ID

  return (
    <div>
      {displayType.map((item) =>
        <li key={item.id}>
          {item.movieId.map((movie) =>
            <div key={movie.id}>
              <div>Title: {movie.title}</div>
              <div>Description: {movie.description}</div>
              <div>Director: {movie.director}</div>
            </div>)}
          <p>User rating: {item.rating}</p>
          <p>User review: {item.review}</p>
          {/* <button onClick={() => { handleShowForm(rankings.id) }}>Edit</button>
          <button onClick={() => { deleteMovies(rankings.id) }}>Delete</button> */}

        </li>)}

      <Form_Popup showForm={showForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={onSubmit} />

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

    let filtered = userMovies.filter((movie) => Number(movie.rating) === rating)
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

const SortDropdown = ({ setUserMovies, userMovies }) => {

  function handleSort(e) {
    let selected = e.target.value
    if (selected === "alphabetical") {
      setUserMovies(userMovies.toSorted((a, b) => a.title.localeCompare(b.title)))

    } else if (selected === "rating") {
      console.log("setting rating")
      setUserMovies(userMovies.toSorted((a, b) => b.rating - a.rating))
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

const SearchBar = ({ userMovies, searchArr, setSearchArr, searchValue, setSearchValue, setToggleSearch }) => {


  function filterByName(e) {
    setToggleSearch(true)
    setSearchValue(e.target.value)
    let filtered = userMovies.filter(movie => movie.title.startsWith(e.target.value))
    setSearchArr(filtered)
    console.log(searchArr)

    if (e.target.value === "") {
      setToggleSearch(false)
    }

  }

  return (
    <input
      value={searchValue}
      onChange={(e) => filterByName(e)} />
  )
}


const Body_Right = ({ user, userMovies, deleteMovies, setCurrentId, setUserMovies, toggleFilter, setToggleFilter, filter, setFilter, setShowForm, onSubmit, newRating, newReview, setNewRating, setNewReview, searchArr, setSearchArr, searchValue, setSearchValue, toggleSearch, setToggleSearch }) => {
    
  function showUsername(){
   if (user) return user.username 
  }
  return (
  <div id="body_right">
    <div>{showUsername()}</div>
    <div id="films_header">My Films</div>
    <div id="films_UI">
      <button>Add Films</button>
      <SortDropdown userMovies={userMovies} setUserMovies={setUserMovies} />
      <FilterDropdown userMovies={userMovies} setUserMovies={setUserMovies} toggleFilter={toggleFilter} setToggleFilter={setToggleFilter} filter={filter} setFilter={setFilter} />
    </div>
    <SearchBar userMovies={userMovies} searchArr={searchArr} setSearchArr={setSearchArr} searchValue={searchValue} setSearchValue={setSearchValue} toggleSearch={toggleSearch} setToggleSearch={setToggleSearch} />
    <MovieDisplay user={user} userMovies={userMovies} deleteMovies={deleteMovies} setCurrentId={setCurrentId} toggleFilter={toggleFilter} setToggleFilter={setToggleFilter} filter={filter} setFilter={setFilter} setShowForm={setShowForm} onSubmit={onSubmit} newRating={newRating} newReview={newReview} setNewRating={setNewRating} setNewReview={setNewReview} setCurrentId={setCurrentId} toggleSearch={toggleSearch} searchArr={searchArr} />
  </div>
)}

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
    let id = e.target.value
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
  const { movies, setMovies } = useMovies();
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedMediaUser')
    return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
  })
  const [token, setToken] = useState(() => {
    return (user) ? `Bearer ${user.token}` : null})

  useEffect(() => {
    if (user) {
      localStorage.setItem('loggedUserJSON', JSON.stringify(user))
    } else {
      localStorage.removeItem('loggedJSONUser');
    }
  }, [user]);

  function getToken(newToken) {
  setToken(`Bearer ${newToken}`)
  console.log(token)
}

  const handleLogout = () => {
    if (user) {
      console.log(`user logged out`)
      return window.localStorage.clear()
    }
    return console.log("no user logged in currently")

  }

  return (
    <Router>
      <div id="header">
        <div>chatterBOXD</div>
        <Link to="/">home</Link>
        <Link to="/profile">profile</Link>
        <Link to="/users">users</Link>
        <Link to="/movies">movies</Link>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Routes>
        <Route path="/movies/:id" element={
          <Movies movies={movies} setMovie={setMovies} />
        } />
        <Route path="/" element={<Home user={user} setUser={setUser} getToken={getToken} />}>
          <Route path="/aboutme" element={<AboutMe />} />
        </Route>
        <Route path="/profile" element={<UserProfile movies={movies} setMovies={setMovies} setUser={setUser} user={user} token={token}/>} />
        <Route path="/movies" element={<MoviesPage movies={movies} setMovies={setMovies} />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  )
}

export default App



