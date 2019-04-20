const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const pass = process.argv[2]

const url =
  `mongodb+srv://dev:${pass}@puhelinluettelo-kdref.mongodb.net/puhelinluettelo?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const schema = new mongoose.Schema({
  name: String,
  number: String,
})

const Number = mongoose.model('Number', schema);

if( process.argv.length > 3 ) {
    const num = new Number({
        name: process.argv[3],
        number: process.argv[4]
    })
    num.save().then(res => {
        console.log("Tallennettu numero")
        mongoose.connection.close()
    }).catch((err) => {
        console.log(err)
    })
} else {
    Number.find({}).then(result => {
        console.log("Puhelinluettelo:")
        result.forEach(element => {
            console.log(`${element.name} ${element.number}`)
        });
        mongoose.connection.close()
    }).catch((err) => {
        console.log(err)
    })
}