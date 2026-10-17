
const FilterDropdown = ({ userMovies, setFilter, toggleFilter, setToggleFilter }) => {
  function filterByRating(e) {

    let rating = Number(e.target.value)
    if (rating > 0) {
      setToggleFilter(true)
    } else if (rating === 0) {
      setToggleFilter(false)
    }

    let filtered = userMovies.filter((movie) => Number(movie.rating) === rating)
    console.log(filtered)
    console.log(toggleFilter)
    return setFilter(filtered)


  }
  return (
    <div>
      <select name="filter" id="filter" onChange={(e) => { filterByRating(e) }}>
        <option value="0">Select a filter</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  )
}

export default FilterDropdown