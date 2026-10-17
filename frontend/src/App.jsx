
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useEffect, useState } from "react"
import './style.css'

// hooks
import useMovies from "./hooks/useMovies"

// components
import NotFound from "./components/NotFound"
import AboutMe from "./components/AboutMe"
import Movies from "./components/Movies"

// pages
import HomePage from "./pages/HomePage"
import MoviesPage from "./pages/MoviesPage"
import UsersPage from "./pages/UsersPage"
import UserProfilePage from './pages/UserProfilePage'





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
        <Route path="/" element={<HomePage user={user} setUser={setUser} getToken={getToken} />}>
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



