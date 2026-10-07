const rankingRouter = require('express').Router()
const Ranking = require('../models/ranking')

rankingRouter.get('/', async (req, res) => {
    const rankings = await Ranking.find({})

    res.json(rankings)
})

rankingRouter.post('/', async (req, res) => {
    const body = await req.body

    const ranking = new Ranking({
        rating: body.rating,
        movie: body.movie,
        userId: body.userId
    })

    const newRanking = await ranking.save()
    res.json(newRanking)
})


module.exports = rankingRouter


// const rankingSchema = new mongoose.Schema({
//     rating: Number,
//     movie: String,
//     userId: String
// })
