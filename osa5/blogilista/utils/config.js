if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  let PORT = process.env.PORT
  let mongoUrl = process.env.MONGOURI

  if (process.env.NODE_ENV === 'test') {
    mongoUrl = process.env.TEST_MONGOURI
  }
  
  module.exports = {
    mongoUrl,
    PORT
  }