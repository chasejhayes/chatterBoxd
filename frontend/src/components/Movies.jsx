import { useParams, Link } from 'react-router-dom'

const Movies = ({ movies }) => {
  const id = useParams().id
  const item = movies.find(n => n.id === id)


  if (!item) {
    return <div>Loading...</div>
  }

  console.log(item)
 
  return (
    <div id="body">
      <ul>
        <h2>{item.title}</h2>
        <p>Directed By: {item.director}</p>
        <h3>Description</h3>
        <p>{item.description}</p>
        <h4>All Reviews</h4>
        <ul>
          {item.rankings.map((ranking) =>
            <li key={ranking.id}>
             <Link to={`/users/${ranking.userId}`}>{ranking.username}</Link>
              <p>Rating: {ranking.rating}</p>
              <p>Review:{ranking.review}</p>
            </li>)}
        </ul>
      </ul>
    </div>
  )
}
{/* <Link to={`/users/${user.id}`}>{user.username}</Link> */}
export default Movies