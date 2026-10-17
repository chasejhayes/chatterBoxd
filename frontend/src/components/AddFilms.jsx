import FormPopup from "./FormPopup"

const AddFilms = ({ movies, showForm, setShowForm, onSubmit, newRating, setNewRating, newReview, setNewReview, setCurrentId, userMovies }) => {


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
      <FormPopup showForm={showForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={onSubmit} />
    </div>
  )
}

export default AddFilms