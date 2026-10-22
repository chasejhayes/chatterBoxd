import FormPopup from "./FormPopup"
import { useState } from 'react'

const AddFilms = ({ movies, showForm, setShowForm, onSubmit, newRating, setNewRating, newReview, setNewReview, setCurrentId, userMovies }) => {

  const [addRankingsOn, setAddRankingsOn] = useState(false)


  const handleShowForm = (id) => {
    if (userMovies.some((x) => x.id == id)) {
      return alert("Film already in list")
    } else {
      return setShowForm(true)
    }
  }

  const handleCloseForm = () => {
    return setAddRankingsOn(false)
  }

const handleSetId = (e) => {
  let id = e.target.value
  setCurrentId(id)
  setAddRankingsOn(true)
  handleShowForm(id)
}

return (

  <div>
    {addRankingsOn && <FormPopup showForm={showForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={onSubmit} setView={handleCloseForm} formId="newRating" />}
    <select name="movies" id="movies" onChange={(e) => { handleSetId(e) }}>
      <option value="">Please select a film</option>
      {movies.map(item =>
        <option key={item.id} value={item.id}>{item.title}</option>
      )}
    </select>
  </div>
)
}

export default AddFilms