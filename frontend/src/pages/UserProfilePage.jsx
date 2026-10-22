import axios from "axios"
import { useEffect, useState } from "react"
import ProfileHeader from "../components/ProfileHeader"
import BodyRight from "../components/BodyRight"
import AddFilms from "../components/AddFilms"


const UserProfilePage = ({ movies, user, token, userId }) => {


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
  const [addRankingsFormOn, setAddRankingsFormOn] = useState(false)
  const [editFormOn, setEditFormOn] = useState(false)




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
      userId: user.id
    }

    axios.post(
      `/api/rankings/`, postRequest, config
    )
      .then(res => {

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
    setAddRankingsFormOn(false)
    setCurrentId('')


  }


  // add userId to parameters
  function deleteMovies(id, userId, movieId) {
    axios.delete(`/api/rankings/${id}`, { data: { userId: userId, movieId: movieId } })
      .then(() => {
        setUserMovies(userMovies.filter(item => item.id !== id))
      })
  }




  return (
    <div>
      <div id="body">
        <ProfileHeader />
        <AddFilms movies={movies} setUserMovies={setUserMovies} userMovies={userMovies} showForm={showForm} setShowForm={setShowForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={addUserRatingAndReview} setCurrentId={setCurrentId} addRankingsFormOn={addRankingsFormOn} editFormOn={editFormOn} setAddRankingsFormOn={setAddRankingsFormOn} />
        <BodyRight user={user} userMovies={userMovies} deleteMovies={deleteMovies} setCurrentId={setCurrentId} setUserMovies={setUserMovies} toggleFilter={toggleFilter} setToggleFilter={setToggleFilter} filter={filter} setFilter={setFilter} setShowForm={setShowForm} showForm={showForm} newRating={newRating} newReview={newReview} setNewRating={setNewRating} setNewReview={setNewReview} searchArr={searchArr} setSearchArr={setSearchArr} searchValue={searchValue} setSearchValue={setSearchValue} toggleSearch={toggleSearch} setToggleSearch={setToggleSearch} userId={userId} editFormOn={editFormOn} setEditFormOn={setEditFormOn} currentId={currentId} setUserMovies={setUserMovies} />
      </div>
    </div>
  )

}

export default UserProfilePage