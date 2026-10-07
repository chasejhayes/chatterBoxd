const movieRouter = require('express').Router()
const Movie = require('../models/movie')
const User = require('../models/user')


movieRouter.get('/', async (req, res) => {
    const movie = await Movie.find({}).populate('rankings')
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
        rankings: body.rankings
    })

    const newMovie = await movie.save()
    res.json(newMovie)
    
})


// Patch is 'posting' a new rating to an already existing movie
// movieRouter.patch('/:id', (req, res, next) => {

//     const { rating, userID } = req.body;
//     const user = User.findById(user)
//     console.log(rating, user)
//     console.log(`Id is: ${req.params.id}`)
//     Movie.findById(req.params.id)
//         .then((movie) => {
//             console.log(movie.users),
//                 movie.users.push(req.body)

//             return movie.save().then((updatedMovie) => {
//                 res.json(updatedMovie)
//             })

//         }
//         )

// })

// req body must include: rating, user id

movieRouter.patch('/:id', async (req, res) => {
    const {rating, userId } = req.body;


    const user = await User.findById(userId)

    const updatedMovie = await Movie.findById(req.params.id)

    updatedMovie.users.push(req.body)

    
    const savedMovie = await updatedMovie.save()
    user.rankings = user.rankings.concat(savedMovie.id)
    await user.save()

    res.json(savedMovie)

})

// patch for changing a rating on an already existing rating
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