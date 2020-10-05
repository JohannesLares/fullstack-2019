const tokenExtractor = (request, response, next) => {
    const sentAuthorization = request.get('authorization')
    if(sentAuthorization && sentAuthorization.toLowerCase().startsWith('bearer ')){
        request.authorization = sentAuthorization.substring(7)
        next()
    }else{
        next()
    }
}

module.exports = {tokenExtractor}