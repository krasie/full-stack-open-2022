const blogsRouter = require('express').Router()
const Blog = require('../models/blog')




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

    if (!request.user || !request.token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = request.user
    const blog = new Blog({...request.body,user:user.id,author:user.name})
    const resp = await blog.save()
    user.blogs = user.blogs.concat(resp.id)
    await user.save()
    response.status(201).json(resp)
})

blogsRouter.delete('/:id', async (request, response) => {



    
  if (!request.user || !request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const id = request.params.id

  const blog = await Blog.findById(id)

  if(blog.user.toString() === request.user.id.toString()){
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  }else{
    response.status(401).json({ error: 'Insufficient permissions' })
  }
  
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  const updateBlog =await Blog.findByIdAndUpdate(id,body,{ new: true, runValidators: true, context: 'query' })
  response.json(updateBlog)
})


module.exports = blogsRouter