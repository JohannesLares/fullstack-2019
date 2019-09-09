const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const basicBlogs = [
    {
        title: "Testi1",
        author: "Testaaja",
        url: "https://mongo.db.test",
        likes: 0
    },
    {
        title: "Testi2",
        author: "Testattava",
        url: "https://mongo.db.test2",
        likes: 10
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let newBlog = new Blog(basicBlogs[0])
    await newBlog.save()
    
    newBlog = new Blog(basicBlogs[1])
    await newBlog.save()
})

test('length of blogs are correct', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body.length).toBe(2)
})

test('Id key name is id not _id', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
})

test('/api/blogs POST creates and saves new blog', async () => {
    await api.post("/api/blogs").send({title: "Testi3", author: "TestApp", url: "newUrl.fi", likes: 1})
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(3)
})

test('if amount of likes is not given set it to 0', async () => {
    await Blog.deleteMany({})
    await api.post("/api/blogs").send({title: "Testi4", author: "TestApp2", url: "newUrl.fi"})
    const res = await api.get('/api/blogs')
    expect(res.body[0].likes).toBe(0)
})

test('if post title missing, returns 400', async () => {
    await api.post("/api/blogs").send({author: "TestApp", url: "newUrl.fi", likes: 1}).expect(400)
})

test('if post url missing, returns 400', async () => {
    await api.post("/api/blogs").send({title: "Testi4", author: "TestApp", likes: 1}).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})