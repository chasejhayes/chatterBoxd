import { Link } from "react-router-dom"

const MoviesPage = ({ movies }) => {

  return (
    <div id="body">
      <ul>
        {movies.map((item) =>
          <li key={item.id}>
            <Link to={`/movies/${item.id}`}>{item.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default MoviesPage

