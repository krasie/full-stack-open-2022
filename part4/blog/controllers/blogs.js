const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRouter.get('/:id', async(request, response) => {
  const id = request.params.id
  const blogs = await Blog.findById(id)
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    console.log(request.body.userId)
    const blog = new Blog({...request.body,user:user.id,author:user.name})
    const resp = await blog.save()
    user.blogs = user.blogs.concat(resp.id)
    await user.save()
    response.status(201).json(resp)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  const updateBlog =await Blog.findByIdAndUpdate(id,body,{ new: true, runValidators: true, context: 'query' })
  response.json(updateBlog)
})


module.exports = blogsRouter