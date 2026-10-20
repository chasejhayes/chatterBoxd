import SearchBar from "./SearchBar"
import FilterDropdown from "./FilterDropdown"
import SortDropdown from "./SortDropdown"
import MovieDisplay from "./MovieDisplay"

const BodyRight = ({ user, userMovies, deleteMovies, setCurrentId, setUserMovies, toggleFilter, setToggleFilter, filter, setFilter, setShowForm, onSubmit, newRating, newReview, setNewRating, setNewReview, searchArr, setSearchArr, searchValue, setSearchValue, toggleSearch, setToggleSearch, userId }) => {
    
  function showUsername(){
   if (user) return user.username 
  }
  return (
  <div id="body_right">
    <div>{showUsername()}</div>
    <div id="films_header">My Films</div>
    <div id="films_UI">
      <button>Add Films</button>
      <SortDropdown userMovies={userMovies} setUserMovies={setUserMovies} />
      <FilterDropdown userMovies={userMovies} setUserMovies={setUserMovies} toggleFilter={toggleFilter} setToggleFilter={setToggleFilter} filter={filter} setFilter={setFilter} />
    </div>
    <SearchBar userMovies={userMovies} searchArr={searchArr} setSearchArr={setSearchArr} searchValue={searchValue} setSearchValue={setSearchValue} toggleSearch={toggleSearch} setToggleSearch={setToggleSearch} />
    <MovieDisplay user={user} userMovies={userMovies} deleteMovies={deleteMovies} setCurrentId={setCurrentId} toggleFilter={toggleFilter} setToggleFilter={setToggleFilter} filter={filter} setFilter={setFilter} setShowForm={setShowForm} onSubmit={onSubmit} newRating={newRating} newReview={newReview} setNewRating={setNewRating} setNewReview={setNewReview} setCurrentId={setCurrentId} toggleSearch={toggleSearch} searchArr={searchArr} userId={userId} />
  </div>
)}

export default BodyRight