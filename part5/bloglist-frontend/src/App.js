import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
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
  const [message, setMessage] = useState({})
  const [newBlogVisible, setNewBlogVisible] = useState(false)
  


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      showMessage('login successful')
    }
    blogService.getAll().then(blogs =>{
      setBlogs( blogs )
    }
     
    )  
  }, [])


  const showMessage = (message,type='info') => {
    setMessage({message:message,type:type})
        setTimeout(() => {
          setMessage({})
        }, 5000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({username, password})
      setUser(user)
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      showMessage('login successful')

      setUsername('')
      setPassword('')

    }catch(e){
      showMessage('username or password is incorrect', 'error')
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
    try{
      const response = await blogService.create(blogObj)
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
      showMessage('blog created successfully')
    }catch(e){
      showMessage('create blog failed', 'error')
    }
    
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

const newBlog = () =>{

  const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: newBlogVisible ? '' : 'none' }

  return(
    <div>
      <div style={hideWhenVisible}>
        <button onClick={e => setNewBlogVisible(true)} >new blog</button>
      </div>
      <div style={showWhenVisible}>
        <NewBlogForm 
          handleSubmit={handleNewBlog} 
          handleTitleChange={e => setTitle(e.target.value)}
          handleAuthorChange={e => setAuthor(e.target.value)}
          handleUrlChange={e => setUrl(e.target.value)}
          title={title}
          author={author}
          url={url}/>
          <button onClick={e => setNewBlogVisible(false)} >cancel</button>
      </div>
    </div>
  )
}

  const handleBlogVisible = e => {
    const updateBlog = blogs.find(blog => blog.id === e.target.value)
    updateBlog.visible = !updateBlog.visible
    setBlogs(blogs.map(obj =>  obj.id === updateBlog.id? updateBlog : obj))
  }

  return (
    <div>
      <Notification message={message.message} type={message.type} />
      {user === null ? loginForm() :
        <div>
          <p>{user.username} logged in</p>
          <button type="button" onClick={logout}>Logout</button>
          {newBlog()}
        </div>
      }
      
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} 
              blog={blog} 
              handleBlogVisible={handleBlogVisible} 
        />
      )}
    </div>
  )
}

export default App
