
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
import Users from './components/Users'
import useUsers from './hooks/useUsers'

// pages
import HomePage from "./pages/HomePage"
import MoviesPage from "./pages/MoviesPage"
import UsersPage from "./pages/UsersPage"
import UserProfilePage from './pages/UserProfilePage'





function App() {
  const { movies, setMovies } = useMovies();
  const { allUsers, setAllUsers } = useUsers();
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedMediaUser')
    return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
  })
  const [token, setToken] = useState(() => {
    return (user) ? `Bearer ${user.token}` : null
  })

  const [userId, setUserId] = useState("")
  const [viewLogout, setViewLogout] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedMediaUser')
    return loggedUserJSON ? true : false
  })

  const [showLogin, setShowLogin] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedMediaUser')
    return loggedUserJSON ? false : true
  })
  useEffect(() => {
    if (user) {
      localStorage.setItem('loggedUserJSON', JSON.stringify(user))
    } else {
      localStorage.removeItem('loggedJSONUser');
    }
  }, [user]);

  function getToken(newToken) {
    setToken(`Bearer ${newToken}`)
  }

  const handleLogout = () => {
    if (user) {
      console.log(`user logged out`)
      setViewLogout(false)
      setShowLogin(true)
      window.location.reload()
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
        {viewLogout && <button onClick={handleLogout}>logout</button>}
      </div>

      <Routes>

        <Route path="/" element={<HomePage user={user} setUser={setUser} getToken={getToken} setUserId={setUserId} viewLogout={viewLogout} setViewLogout={setViewLogout} showLogin={showLogin} setShowLogin={setShowLogin} />}>
          <Route path="/aboutme" element={<AboutMe />} />
        </Route>


        <Route path="/profile" element={<UserProfilePage movies={movies} setMovies={setMovies} setUser={setUser} user={user} token={token} />} userId={userId} />


        <Route path="/movies" element={<MoviesPage movies={movies} setMovies={setMovies} />} />

        <Route path="/movies/:id" element={
          <Movies movies={movies} setMovie={setMovies} />
        } />



        <Route path="/users" element={<UsersPage allUsers={allUsers} setAllUsers={setAllUsers} />} />

        <Route path="/users/:id" element={
          <Users allUsers={allUsers} setAllUsers={setAllUsers} />
        } />





        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  )
}

export default App



