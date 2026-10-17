
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useEffect, useState } from "react"
import './style.css'

// hooks
import useMovies from "./hooks/useMovies"

// components
import Home from "./components/Home"
import NotFound from "./components/NotFound"
import AboutMe from "./components/AboutMe"
import Movies from "./components/Movies"

// pages
import MoviesPage from "./pages/MoviesPage"
import UsersPage from "./pages/UsersPage"
import UserProfilePage from './pages/UserProfilePage'






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






// const Add_Films = ({ movies, showForm, setShowForm, onSubmit, newRating, setNewRating, newReview, setNewReview, setCurrentId, userMovies }) => {


//   const handleShowForm = (id) => {
//     if (userMovies.some((x) => x.id == id)) {
//       return alert("Film already in list")
//     } else {
//       return setShowForm(true)
//     }
//   }
//   const handleSetId = (e) => {
//     let id = e.target.value
//     setCurrentId(id)
//     handleShowForm(id)
//   }

//   return (
//     <div>
//       <select name="movies" id="movies" onChange={(e) => { handleSetId(e) }}>
//         <option value="">Please select a film</option>
//         {movies.map(item =>
//           <option key={item.id} value={item.id}>{item.title}</option>
//         )}
//       </select>
//       <Form_Popup showForm={showForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={onSubmit} />
//     </div>
//   )
// }





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
        <Route path="/profile" element={<UserProfilePage movies={movies} setMovies={setMovies} setUser={setUser} user={user} token={token}/>} />
        <Route path="/movies" element={<MoviesPage movies={movies} setMovies={setMovies} />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  )
}

export default App



