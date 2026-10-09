const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
})



usersRouter.get('/', async (req, res) => {

    const users = await User.find({}).populate('rankings', {review: 1, rating: 1})
    res.json(users)
})

usersRouter.get('/:id', async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }

})


usersRouter.delete('/:id', async (req, res) => {
    const users = await User.findByIdAndDelete(req.params.id)
    res.status(204).end()
})




module.exports = usersRouter