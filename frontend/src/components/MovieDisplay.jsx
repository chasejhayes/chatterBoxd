import FormPopup from "./FormPopup"


const MovieDisplay = ({ user, userMovies, deleteMovies, toggleFilter, filter, showForm, setShowForm, onSubmit, newRating, setNewRating, newReview, setNewReview, setCurrentId, toggleSearch, searchArr, userId, editFormOn, setEditFormOn }) => {


  let displayType = userMovies;



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




  return (
    <div>

      {editFormOn && <FormPopup showForm={showForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={onSubmit} formId="edit" />}

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
          <button onClick={() => { handleShowForm1(item.id), setEditFormOn(true) }}>Edit</button>
          <button onClick={() => { deleteMovies(item.id, item.userId, item.movieId[0].id) }}>Delete</button>
          {/* <button onClick={() => { test(item.movieId[0].id) }}>Delete</button> */}


        </li>)}

    </div>
  )
}

export default MovieDisplay