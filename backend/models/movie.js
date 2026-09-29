const mongoose = require('mongoose')
const config = require('../utils/config')
require('dotenv').config()



const url = MONGODB_URI

console.log('connecting to', url)


mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI, { family: 4 })

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 1,
        required: true
    },
    director:  {
        type: String,
        minLength: 1,
        required: true
    },
    releaseDate:  {
        type: String,
        minLength: 1,
        required: true
    },
    description:  {
        type: String,
        minLength: 1,
        required: true
    },
    averageRating:  {
        type: Number,
        minLength: 1,
        required: true
    },
    reviews: {
        type: Array,
        minLength: 1,
        required: true
    },
    review:  {
        type: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    rating: {
        type: Number,
    },

})

movieSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Movie = mongoose.model('Movie', movieSchema)

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
    movieData: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]
})

module.exports = mongoose.model('Movie', movieSchema)