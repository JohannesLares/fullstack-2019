const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
  
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {blogs: 0}).populate('comments')
    response.json(blogs.map(blog => blog.toJSON()))
})
   
blogsRouter.post('/', async (request, response) => {
  const token = request.authorization;
  if(!request.body.hasOwnProperty("title") || !request.body.hasOwnProperty("url")){
    response.status(400).json({error: "bad request"})
    return;
  }
  try{
    const body = request.body
    const decoded = jwt.verify(request.authorization, process.env.SECRET)
    if(!token || !decoded.id){
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const blog = new Blog({
      user: decoded.id,
      title: body.title,
      author: body.author,
      likes: body.likes,
      url: body.url
    })
    const result = await blog.save()
    const user = await User.findById(decoded.id)
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.send({result})
  } catch (e) {
    console.log(e)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try{
    const decoded = jwt.verify(req.authorization, process.env.SECRET)
    console.log(decoded)
    if(!req.authorization || !decoded.id){
      return res.status(401).json({error: 'token missing or invalid'}).end()
    }
    const blog = await Blog.findById(req.params.id)
    if(blog.user != decoded.id){
      res.status(403).json({error: "Forbidden"})
      return;
    }
    await blog.remove();
    res.status(204).json({message : "Resource deleted successfully"})
  }catch(e){
    res.status(400).end()
  }
})

blogsRouter.post('/edit/:id', async (req, res) => {
  const update = req.body;
  if(!update.hasOwnProperty("title") || !update.hasOwnProperty("url")){
    response.status(400).end()
    return;
  }
  const updatedBlog = {
    title: update.title,
    author: update.author,
    url: update.url,
    likes: update.likes,
    user: update.user
  }
  try{
    const final = await Blog.findOneAndUpdate({_id: req.params.id}, updatedBlog, {new:true});
    res.json(final.toJSON()).end()
  }catch{
    res.status(400).end();
  }
})

blogsRouter.post('/comment', async (req, res) => {
  const update = req.body.comment
  console.log(update)
  try {
    const newComment = new Comment({
      blog: update.id,
      comment: update.comment
    })
    const comm = await newComment.save()
    res.status(200).send({comm})
    var blogToUpdate = await Blog.findById(update.id)
    blogToUpdate.comments.push(comm.id)
    blogToUpdate.save()
  } catch {
    res.status(500).end()
  }
})



module.exports = [blogsRouter, Blog]