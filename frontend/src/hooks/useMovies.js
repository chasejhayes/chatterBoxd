import { useEffect, useState } from "react"
import axios from "axios"


export default function useMovies() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/api/movies')
      .then((response) => {
        setMovies(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

  return { movies, setMovies }

}

