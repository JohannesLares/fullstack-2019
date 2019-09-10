const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res) => {
    const body = req.body

    const user = await User.findOne({username: body.username})
    const correctpwd = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

    if(!(user && correctpwd)){
        return res.status(401).json({error: "Wrong password or username"})
    }

    const userToken = {
        username: user.username,
        id: user._id
    }

    const access_token = await jwt.sign(userToken, process.env.SECRET)
    res.status(200).json({token: access_token, username: user.username, name: user.name})

})

userRouter.post('/register', async (req, res) => {
    try{
        const body = req.body;
        const salt = 10
        if(body.password.length < 3){
            return res.status(400).json({error: "Password too short", name: "Validation error"})
        }
        const passwordHash = await bcrypt.hash(body.password, salt)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })

        const saved = await user.save()

        res.status(204).json(saved);
    }catch(e){
        console.log(e)
        res.status(400).send({e})
    }
})

userRouter.get('/', async (req, res) => {
    const users = await User
    .find({}).populate('blogs', {user: 0, likes: 0, id: 0})
    res.json(users.map(user => user.toJSON()))
})

module.exports = userRouter