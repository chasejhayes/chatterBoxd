import FormPopup from "./FormPopup"
import {useState} from 'react'

const MovieDisplay = ({ user, userMovies, deleteMovies, toggleFilter, filter, showForm, setShowForm, onSubmit, newRating, setNewRating, newReview, setNewReview, setCurrentId, toggleSearch, searchArr, userId }) => {

  const [viewEditForm, setViewEditForm] = useState(false)

  let displayType = userMovies



  function handleShowForm1(id) {
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

      {viewEditForm && <FormPopup showForm={showForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={onSubmit} setView={setViewEditForm} formId="edit" />}

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
          <button onClick={() => { handleShowForm1(item.id), setViewEditForm(true) }}>Edit</button>
          <button onClick={() => { deleteMovies(item.id, item.userId, item.movieId[0].id) }}>Delete</button>
          {/* <button onClick={() => { test(item.movieId[0].id) }}>Delete</button> */}


        </li>)}

    </div>
  )
}

export default MovieDisplay