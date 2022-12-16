const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async(request, response) => {
  const id = request.params.id
  const blogs = await Blog.findById(id)
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const resp = await blog.save()
    response.status(201).json(resp)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const resp = await blog.save()
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