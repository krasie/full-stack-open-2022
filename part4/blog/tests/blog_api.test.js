const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')


const getToken = async() =>{
  const login = await api.post("/api/login").send({
    "username": "mluukkai",
    "password": "salainen"
  })
  const token = 'Bearer ' + login.body.token
  return token
}


const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    userId:'639c36f9c7bd169fab014b6a',
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    userId:'639c36f9c7bd169fab014b6a',
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    userId:'639c36f9c7bd169fab014b6a',
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    userId:'639c36f9c7bd169fab014b6a',
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    userId:'63a8ffa405bd82d8c4197e75',
    likes: 2,
    __v: 0
  }  
]

const  oneBlog = {
  title: "Type wars",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  userId:'639c36f9c7bd169fab014b6a',
  likes: 1
}


const  noHasLikes = {
  title: "Type wars",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
}

const  noHasTitle = {
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
}

const updateBlog = {
  title: "Type wars new",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

const  noHasUrl = {
  title: "Type wars",
  author: "Robert C. Martin"
}


test('Blogs return the correct amount', async () => {
  const resp = await api.get('/api/blogs')
  const blogLength = resp.body.length
  
  expect(blogLength).toBe(6)
})


test('ID is defined', async () => {
  const resp = await api.get('/api/blogs')
  resp.body.map(
    blog => {
      expect(blog.id).toBeDefined()
    }
  )
})



test('Add a blog', async () => {

  const token = await getToken()

  const resp = await api.get('/api/blogs').set({ Authorization: token })
  await api.post('/api/blogs').send(oneBlog).set({ Authorization: token }).expect(201).expect('Content-Type', /application\/json/)
  const newResp = await api.get('/api/blogs').set({ Authorization: token })
  expect(newResp.body).toHaveLength(resp.body.length + 1)
},20000)


test('Add a blog without login', async () => {
  await api.post('/api/blogs').send(oneBlog).expect(401).expect('Content-Type', /application\/json/)  
},20000)


test('When likes is not defined,return 0', async () => {

  const token = await getToken()

  const newBlog = noHasLikes
  const resp = await api.post('/api/blogs').send(newBlog).set({ Authorization: token }).expect(201).expect('Content-Type', /application\/json/)
  const id = resp.body.id
  const newResp = await api.get(`/api/blogs/${id}`).set({ Authorization: token })
  const likes = Number(newResp.body.likes)
  expect(likes).toBe(0)
},20000)

test('When title or url is not defiend ,return 400 request', async () => {
  const token = await getToken()
  await api.post('/api/blogs').send(noHasTitle).set({ Authorization: token }).expect(400)
  await api.post('/api/blogs').send(noHasUrl).set({ Authorization: token }).expect(400)
},20000)


describe("Delete blog",() => {
  test("Delete a blog",async () =>{
    const token = await getToken()
    const del = await api.delete('/api/blogs/5a422bc61b54a676234d17fc').set({ Authorization: token }).send().expect(204)
    console.log(del.body)
  })

  test("delete a not exist blog",async ()=>{
    const token = await getToken()
    await api.delete("/api/blogs/1111").set({ Authorization: token }).send().expect(400)
  })

})


describe("Update a blog",()=>{
  test("Update a blog",async() =>{
    const token = await getToken()
    const resp = await api.put('/api/blogs/5a422bc61b54a676234d17fc').set({ Authorization: token }).send(updateBlog).expect(200)
    expect(resp.body.title).toBe(updateBlog.title)
  })

  test("Update with id not exist",async() =>{
    const token =await getToken()
    const resp = await api.put('/api/blogs/111').set({ Authorization: token }).send(noHasTitle).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})