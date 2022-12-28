import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({username, password})
      setUser(user)
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      setUsername('')
      setPassword('')

    }catch(e){
      setTimeout(() => {
      }, 5000)
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleNewBlog = async(e) =>{
    e.preventDefault()
    const blogObj = {
      "title": title,
      "url": url,
      "author": author
    }
    const response = await blogService.create(blogObj)
    setBlogs(blogs.concat(response))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
          <div>
            <div>
              <input type="text" 
              name="username" 
              placeholder="Username" 
              value={username} 
              onChange={event => setUsername(event.target.value)}
              />
            </div>
            <div>
              <input type="password" 
              name="password" 
              placeholder="Password" 
              vulue={password} 
              onChange={event => setPassword(event.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </div>
      </form>
    </div>  
  )

  const newBlog = () => (
    <div>
      <h1>New Blog</h1>
      <form onSubmit={handleNewBlog}>
        <div>
          <div>
            title:<input type="text" 
                    name="title" 
                    onChange={ e => setTitle(e.target.value)}/>
          </div>
          <div>
            author:<input type="text" 
                    name="author" 
                    onChange={ e => setAuthor(e.target.value)}/>
          </div>
          <div>
            url:<input type="text" 
                    name="url" 
                    onChange={e => setUrl(e.target.value)}/>
          </div>
          <button type="submit">Create Blog</button>
        </div>
      </form>
    
    </div>
    )

  return (
    <div>
      {user === null ? loginForm() :
        <div>
          <p>{user.username} logged in</p>
          <button type="button" onClick={logout}>Logout</button>
          {newBlog()}
        </div>
      }
      
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
