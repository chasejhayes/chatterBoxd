const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
    rankings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ranking'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User

// it's not the movie ID, it's the ranking ID (I think)
// what I'm not getting is how the Object IDs relate to and access one another