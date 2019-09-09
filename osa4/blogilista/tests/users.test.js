const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const basicUser = [
    {
        username:"abc",
        name:"TESTI", 
        password: "123456"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    let newUser = new User(basicUser[0])
    await newUser.save()
})

test('User shall not be created username length < 3', async () => {
    await api.post("/api/login/register").send({username:"a", name:"TESTI", password: "123456"})
    expect(400)
    const users = await api.get('/api/login')
    console.log(users.body)
    expect(users.body.length).toBe(1)
})

test('User shall not be created password length < 3', async () => {
    await api.post("/api/login/register").send({username:"aaa", name:"TESTI", password: "12"})
    expect(400)
    const users = await api.get('/api/login')
    console.log(users.body)
    expect(users.body.length).toBe(1)
})