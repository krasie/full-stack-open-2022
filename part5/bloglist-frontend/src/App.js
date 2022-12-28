import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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

  return (
    <div>
      {user === null ? loginForm() :
        <div>
          <p>{user.username} logged in</p>
          <button type="button" onClick={logout}>Logout</button>
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
