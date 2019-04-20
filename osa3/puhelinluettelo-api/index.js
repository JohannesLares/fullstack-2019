require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
app.use(bodyParser.json())
const cors = require('cors')
const Number = require('./models/number')


app.use(cors())
app.use(express.static('build'))

morgan.token('json', function getId (req) {
  return JSON.stringify(req.body)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Not found' })
}
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

app.get("/api/persons", (req, res, next) => {
  Number.find({}).then(result => {
    res.json(result)
  }).catch((err) => next(err))
})

app.get('/info', (req, res) => {
  var date = new Date();
  Number.find({}).then(result => {
    res.send(`<p>Puhelinluettelossa ${result.length} henkilön tiedot. <br> ${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</p>`)
  })
  
})

app.get('/api/persons/:id', (req, res, next) => {
  Number.findById(req.params.id).then(resp => {
    res.json(resp)
  }).catch(err => next(err))
  
})

app.delete('/api/deletePerson/:id', (req, res, next) => {
  Number.findByIdAndRemove(req.params.id)
    .then(
      res.status(204).end()
    )
    .catch(error => next(error))
})

app.post('/api/newPerson', (req, res, next) => {
  const person = req.body
  if(person.name && person.number){
    const num = new Number({
      name: person.name,
      number: person.number
    })
    num.save().then(
      res.status(201).json({success: true})
    ).catch(error => next(error))
  } else {
    res.status(400).end()
  }
})

app.put('/api/persons/:id', (req, res, next) => {
  
  Number.findById(req.params.id).then(resp => {
    resp.number = req.body.number
    resp.save()
    res.status(202).end()
  }).catch(err => next(err))
})

app.use(unknownEndpoint)
app.use(errorHandler);
const port = process.env.PORT || 3001
app.listen(port)
console.log(`Server running on port ${port}`)