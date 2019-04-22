if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  let PORT = process.env.PORT
  let mongoUrl = process.env.MONGOURI
  
  module.exports = {
    mongoUrl,
    PORT
  }