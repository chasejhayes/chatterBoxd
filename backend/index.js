const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const movieDB = [
    {title: "Celsius", releaseDate: 1998},
    {title: "Backman", releaseDate: 2001}
]

app.get('/api/movies', (req, res) => {
    res.json(movieDB)
})

const PORT = 3001

app.listen((PORT), () => {
    console.log("Listening on 3001")
})

