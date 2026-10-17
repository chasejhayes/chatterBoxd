const SearchBar = ({ userMovies, searchArr, setSearchArr, searchValue, setSearchValue, setToggleSearch }) => {


  function filterByName(e) {
    setToggleSearch(true)
    setSearchValue(e.target.value)
    let filtered = userMovies.filter(movie => movie.title.startsWith(e.target.value))
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