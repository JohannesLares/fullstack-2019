const app = require('./app')
const conf = require('./utils/config')
const http = require('http')

app.listen(conf.PORT, () => {
  console.log(`Server running on port ${conf.PORT}`)
})