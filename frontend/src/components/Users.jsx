import { useParams } from 'react-router-dom'
const Users = ({ allUsers }) => {
  const id = useParams().id
  const item = allUsers.find(n => n.id === id)
  if (!item) {
    return <div>Loading...</div>
  }


  return (
    <div id="body">
      <h1>{item.username}</h1>
      <ul>
        {item.rankings.map((ranking) =>
          <div key={ranking.id}>
            <h3>{ranking.movieId.map((movie) =>
              <div key={movie.id}>{movie.title}</div>)}</h3>
            <li>Rank: {ranking.rating}</li>
            <li>Review: {ranking.review}</li>
          </div>
        )}
      </ul>
    </div>
  )
}

export default Users