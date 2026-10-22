import FormPopup from "./FormPopup"
import axios from 'axios'


const MovieDisplay = ({ user, userMovies, deleteMovies, toggleFilter, filter, showForm, setShowForm,  newRating, setNewRating, newReview, setNewReview, setCurrentId, toggleSearch, searchArr, userId, editFormOn, setEditFormOn, currentId, setUserMovies }) => {



  let displayType = userMovies;



  function handleShowForm(id) {
    setCurrentId(id)
    return setShowForm(true)
  }


  function updateMovies(e) {
    e.preventDefault()


    let patchRequest = {
      rating: newRating,
      review: newReview
    }

    axios.patch(
      `/api/rankings/${currentId}`, patchRequest      
    ).then(res => {
     console.log(res.data.id)
     console.log(userMovies)

     let updated = userMovies.map((movie) => {
      console.log({...movie})
      console.log({...res.data})
      return movie.id == res.data.id 
      ? {...movie, ...res.data}
      : movie
     })
     console.log(updated)
     setUserMovies(updated)
    }) 

  

    setEditFormOn(false)
  }



  if (toggleFilter === true) {
    displayType = filter

  }
  if (toggleSearch === true) {
    displayType = searchArr

  }


  return (
    <div>

      {editFormOn && <FormPopup showForm={showForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={updateMovies} formId="edit" />}

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
          <button onClick={() => { handleShowForm(item.id), setEditFormOn(true)}}>Edit</button>
          <button onClick={() => { deleteMovies(item.id, item.userId, item.movieId[0].id) }}>Delete</button>
        </li>)}

    </div>
  )
}

export default MovieDisplay