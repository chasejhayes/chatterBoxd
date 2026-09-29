// const express = require('express')
// const cors = require('cors')
// const app = express()
// const mongoose = require('mongoose')
// require('dotenv').config()


// app.use(express.static('dist'))
// app.use(express.json())
// app.use(cors())

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')



app.listen((config.PORT), () => {
    logger.info(`Server running on port ${config.PORT}`)
})
