const movieRouter = require('express').Router()
const Movie = require('../models/movie')
const User = require('../models/user')


movieRouter.get('/', async (req, res) => {
    const movie = await Movie.find({})
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
        director: body.director,
        releaseDate: body.releaseDate,
        description: body.description,
        averageRating: body.averageRating,
        allReviews: body.reviews,
        rating: body.rating
    })

    const newMovie = await movie.save()
    res.json(newMovie)
    
})

// 

// movieRouter.post('/:id', (req, res, next) => {
//     const {rating, review, user} = req.body

//     console.log(`Id is: ${req.params.id}`)

//     Movie.findById(req.params.id)
//     .then(
//         ranking[user]: user,
//     )
// })


// Patch is 'posting' a new rating to an already existing movie
movieRouter.patch('/:id', (req, res, next) => {

    const { rating, userID } = req.body;
    const user = User.findById(user)
    console.log(rating, user)
    console.log(`Id is: ${req.params.id}`)
    Movie.findById(req.params.id)
        .then((movie) => {
            console.log(movie.users),
                movie.users.push(req.body)

            return movie.save().then((updatedMovie) => {
                res.json(updatedMovie)
            })

        }
        )

})

// return movie.save().then((updatedMovie) => {
// //                 res.json(updatedMovie)
//             })


// movieRouter.patch('/:id', (req, res, next) => {
//     const { rating, review, user } = req.body

//     console.log(`Id is: ${req.params.id}`)

//     Movie.findById(req.params.id)
//         .then(movie => {
//             if (!movie) {
//                 return res.status(404).end()
//             }
//             console.log(movie)
//             movie.ranking.users = user
//             // movie.ranking.userRanking = rating
//             // movie.ranking.review = review

//             return movie.save().then((updatedMovie) => {
//                 res.json(updatedMovie)
//             })
//         })
//         .catch(error => next(error))
// })

// deletes only review/rating
// movieRouter.delete('/:id', async (req, res) => {
//     const movie = await Movie.findById(req.params.id)
    // movie.review = ""
    // movie.rating = ""

//     const savedMovie = await movie.save()
//     res.json(savedMovie)
// })


// delete full entries
movieRouter.delete('/:id', async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id)
    res.status(204).end()
})


// delete route is only working for review and rating; no way to fully delete



module.exports = movieRouter