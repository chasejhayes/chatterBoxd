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
    const users1 = await User.find({})
    console.log
    const users = await User.find({}).populate({
        path: "rankings", match: {
            'users.userId': /^6/i
        }, select: "users.userId"


    })
    // console.log(`Test: ${users.id}`)
    res.json(users)
})


// , match: {'id':{$eq: users[userId]}}})
    // const filtered = await users.filter((reviews => reviews.userId != null))

// What is happening here?
// the populate fills 'rankings' with what is found in 'Movie' db

module.exports = usersRouter