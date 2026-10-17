import FormPopup from "./FormPopup"

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

      <FormPopup showForm={showForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={onSubmit} />

    </div>
  )
}

export default MovieDisplay