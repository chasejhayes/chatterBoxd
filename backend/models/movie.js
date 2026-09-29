const mongoose = require('mongoose')



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



module.exports = mongoose.model('Movie', movieSchema)