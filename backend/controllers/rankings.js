const rankingRouter = require('express').Router()

const Ranking = require('../models/ranking')
const Movie = require('../models/movie')
const User = require('../models/user')


rankingRouter.get('/', async (req, res) => {
    const rankings = await Ranking.find({})

    res.json(rankings)
})

rankingRouter.post('/', async (req, res) => {
    const body = await req.body

    const ranking = new Ranking({
        rating: body.rating,
        review: body.review,
        movieId: body.movieId,
        userId: body.userId
    })

    await Movie.findByIdAndUpdate(req.body.movieId,
        {$push: {rankings: ranking.id }}
    )
    await User.findByIdAndUpdate(req.body.userId,
        {$push: {rankings: ranking.id}}
    )
    const newRanking = await ranking.save()
    res.json(newRanking)
})

rankingRouter.delete('/:id', async (req, res) => {
    await Ranking.findByIdAndDelete(req.params.id)
    res.status(204).end()
})


module.exports = rankingRouter


// const rankingSchema = new mongoose.Schema({
//     rating: Number,
//     movie: String,
//     userId: String
// })
