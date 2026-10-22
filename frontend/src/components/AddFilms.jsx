import FormPopup from "./FormPopup"

const AddFilms = ({ movies, showForm, onSubmit, newRating, setNewRating, newReview, setNewReview, setCurrentId, userMovies, addRankingsFormOn, setAddRankingsFormOn}) => {

  


  // const handleShowForm = (id) => {
  //   if (userMovies.some((x) => x.id == id)) {
  //     return alert("Film already in list")
  //   } else {
  //     return setShowForm(true)
  //   }
  // }


const handleSetId = (e) => {
  let id = e.target.value
  setCurrentId(id)
  setAddRankingsFormOn(true)
}

return (

  <div>
    {addRankingsFormOn && <FormPopup showForm={showForm} newRating={newRating} setNewRating={setNewRating} newReview={newReview} setNewReview={setNewReview} onSubmit={onSubmit} formId="newRating" addRankingsFormOn={addRankingsFormOn}  />}
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