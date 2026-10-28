const SearchBar = ({ userMovies, searchArr, setSearchArr, searchValue, setSearchValue, setToggleSearch }) => {
  console.log(userMovies)


  function filterByName(e) {
    setToggleSearch(true)
    setSearchValue(e.target.value)
    let filtered = userMovies.filter(movie => movie.movieId[0].title.startsWith(e.target.value))
    setSearchArr(filtered)
    console.log(searchArr)

    if (e.target.value === "") {
      setToggleSearch(false)
    }

  }

  return (
    <input
      value={searchValue}
      onChange={(e) => filterByName(e)} />
  )
}

export default SearchBar