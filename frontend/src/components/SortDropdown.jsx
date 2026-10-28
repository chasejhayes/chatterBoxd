const SortDropdown = ({ setUserMovies, userMovies }) => {
  console.log(userMovies)

  function handleSort(e) {
    let selected = e.target.value
    if (selected === "alphabetical") {
      setUserMovies(userMovies.toSorted((a, b) => a.movieId[0].title.localeCompare(b.movieId[0].title)))

    } else if (selected === "rating") {
      console.log("setting rating")
      setUserMovies(userMovies.toSorted((a, b) => b.rating - a.rating))
    }
  }

  return (
    <div>
      <select name="sort" id="sort" onChange={(e) => { handleSort(e) }}>
        <option value="">Sort</option>
        <option value="alphabetical">Alphabetical</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  )
}

export default SortDropdown