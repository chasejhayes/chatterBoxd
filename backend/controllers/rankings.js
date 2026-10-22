const rankingRouter = require('express').Router()

const Ranking = require('../models/ranking')
const Movie = require('../models/movie')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ', '')
    }
    return null
}

rankingRouter.get('/', async (req, res) => {
    const rankings = await Ranking.find({}).populate('movieId', {title: 1, director: 1, description: 1})
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
    console.log(body)

    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if(!decodedToken.id){
        return res.status(401).json({ error: 'token invalid' })
    }

    // so GET is populating
    

    const ranking = new Ranking({
        rating: body.rating,
        review: body.review,
        movieId: body.movieId,
        userId: body.userId,
        username: body.username
    })

    await Movie.findByIdAndUpdate(req.body.movieId,
        { $push: { rankings: ranking.id } }
    )
    await User.findByIdAndUpdate(decodedToken.id,
        { $push: { rankings: ranking.id } }
    )
    const newRanking = await ranking.save()

    const populatedRanking = await newRanking.populate('movieId', {title: 1, director: 1, description: 1})
    res.json(populatedRanking)
})

rankingRouter.delete('/:id', async (req, res) => {
    let ranking = await Ranking.findByIdAndDelete(req.params.id)
    console.log(ranking)
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

    res.json(updatedRanking)

})


module.exports = rankingRouter

