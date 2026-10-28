import { useParams, Link } from 'react-router-dom'
const Users = ({ allUsers }) => {
  const id = useParams().id
  const item = allUsers.find(n => n.id === id)
  if (!item) {
    return <div>Loading...</div>
  }

  console.log(item)


  return (
    <div id="body">
      <h1>{item.username}</h1>
      <ul>
        {item.rankings.map((ranking) =>
          <div key={ranking.id}>
            <h3>{ranking.movieId.map((movie) =>
              <Link to={`/movies/${movie.id}`} key={movie.id}>{movie.title}</Link>)}</h3>
            <li>Rank: {ranking.rating}</li>
            <li>Review: {ranking.review}</li>
          </div>
        )}
      </ul>
    </div>
  )
}

// {/* <Link to={`/movies/${movie.id}`}>{movie.title}</Link> */}

export default Users