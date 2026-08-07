const express = require('express')
const app = express()

app.use(express.json())

const movieDB = [
    {title: "Celsius", releaseDate: 1998},
    {title: "Backman", releaseDate: 2001}
]

app.get('/', (req, res) => {
    res.send(movieDB)
})

const PORT = 3001

