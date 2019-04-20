const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGOURI

console.log("Connecting to ", url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('Connected to DB', url)
  })
  .catch((error) => {
    console.log('Connection error:', error.message)
  })

const schema = new mongoose.Schema({
  name: {type: String, unique: true, minlength: 3},
  number: {type: String, minlength: 8},
})
schema.plugin(uniqueValidator);

schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
 
module.exports = mongoose.model('Number', schema)