const movieRouter = require('express').Router()
const Movie = require('../models/movie')
const User = require('../models/user')


movieRouter.get('/', (req, res) => {
    Movie.find({}).then(movies => {
        res.json(movies)
    })
    .catch(error => {
        console.log(error)
        res.status(500).end()
    })
})

movieRouter.get('/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .then(movie => {
            if (movie) {
                res.json(movie)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})



movieRouter.post('/', (req, res, next) => {
    const body = req.body

    // if (!body.title) {
    //     return res.status(400).json({ error: 'content missing' }) 
    // }

    const movie = new Movie({
        title: body.title,
        director: body.director,
        releaseDate: body.releaseDate,
        description: body.description,
        averageRating: body.averageRating,
        reviews: body.reviews,
        review: body.review,
        rating: body.rating
    })

    movie.save().then(savedMovie => {
        res.json(savedMovie)
    })
    .catch(error => next(error))
})


movieRouter.patch('/:id', (req, res, next) => {
    const { rating, review } = req.body

    console.log(`Id is: ${req.params.id}`)

    Movie.findById(req.params.id)
        .then(movie => {
            if (!movie) {
                return res.status(404).end()
            }

            movie.rating = rating
            movie.review = review

            return movie.save().then((updatedMovie) => {
                res.json(updatedMovie)
            })
        })
        .catch(error => next(error))
})

// movieRouter.delete('/:id', (req, res, next) => {
//     Movie.findById(req.params.id)
//         .then(movie => {
//             movie.review = ""
//             movie.rating = ""

//             return movie.save().then((updatedMovie) => {
//                 res.json(updatedMovie)
//             })

//         })
//         .catch(error => next(error))
// })

movieRouter.delete('/:id', async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id)
    res.status(204).end()
})


// delete route is only working for review and rating; no way to fully delete



module.exports = movieRouter