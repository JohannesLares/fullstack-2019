const conf = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const mongoose = require('mongoose')
const middleware = require('./middleware/token_extractor')

console.log('connecting to', conf.mongoUrl)


mongoose.connect(conf.mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/login', userRouter)

if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/test')
  app.use('/api/testing', testRouter)
}

module.exports = app