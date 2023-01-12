const config = require('./utils/conf')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)


app.use('/api/blogs', middleware.userExtractor,blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'development') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
    console.log('Testing')
}



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app