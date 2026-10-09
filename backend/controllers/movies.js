const movieRouter = require('express').Router()
const Movie = require('../models/movie')
const User = require('../models/user')


movieRouter.get('/', async (req, res) => {
    const movie = await Movie.find({}).populate('rankings', {review: 1, rating: 1})
    res.json(movie)
})



movieRouter.get('/:id', async (req, res, next) => {
    const movie = await Movie.findById(req.params.id)

    if (movie) {
        res.json(movie)
    } else {
        res.status(404).end()
    }
})



movieRouter.post('/', async (req, res) => {
    const body = await req.body

    const movie = new Movie({
        title: body.title,
        description: body.description,
        director: body.director,
        rankings: body.rankings
    })

    const newMovie = await movie.save()
    res.json(newMovie)
    
})




movieRouter.delete('/:id', async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id)
    res.status(204).end()
})




module.exports = movieRouter