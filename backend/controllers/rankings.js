const rankingRouter = require('express').Router()

const Ranking = require('../models/ranking')
const Movie = require('../models/movie')
const User = require('../models/user')


rankingRouter.get('/', async (req, res) => {
    const rankings = await Ranking.find({})
    res.json(rankings)
})

rankingRouter.get('/:id', async (req, res, next) => {
    const rankings = await Ranking.findById(req.params.id)
    if (rankings) {
        res.json(rankings)
    } else {
        res.status(404).end()
    }

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
        { $push: { rankings: ranking.id } }
    )
    await User.findByIdAndUpdate(req.body.userId,
        { $push: { rankings: ranking.id } }
    )
    const newRanking = await ranking.save()
    res.json(newRanking)
})

rankingRouter.delete('/:id', async (req, res) => {
    await Ranking.findByIdAndDelete(req.params.id)
    await User.findByIdAndUpdate(req.body.userId,
        { $pull: { rankings: ranking.id } }
    );
    await Movie.findByIdAndUpdate(req.body.movieId,
        { $pull: { rankings: ranking.id } }
    )
    res.status(204).end()
})

rankingRouter.patch('/:id', async (req, res) => {
    const { review, rating } = req.body;

    const updatedRanking = await Ranking.findByIdAndUpdate(req.params.id)
    if (!updatedRanking) {
        return res.status(404).end()
    }
    updatedRanking.rating = rating;
    updatedRanking.review = review;
    await updatedRanking.save()

    const updatedUserRanking = await User.findByIdAndUpdate(req.params.id)
    updatedUserRanking.rankings.rating = rating;
    updatedUserRanking.rankings.review = review;
    await updatedUserRanking.save()

    const updatedMovieRanking = await Movie.findByIdAndUpdate(req.params.id)
    updatedMovieRanking.rankings.rating = rating;
    updatedMovieRanking.rankings.review = review;
    await updatedMovieRanking.save()

    res.json(updatedRanking)

})


module.exports = rankingRouter

