import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification.js'
import Newblog from './components/Newblog'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState('')
  const [newBlogVisible, setNewBlogVisible] = useState(false)

  const likeComparator = (a, b) => {
    if(a.likes > b.likes) return -1
    if(b.likes > a.likes) return 1
    return 0
  }

  const getBlogs = () => {
    blogService.getAll()
      .then(initialBlogs => {
        initialBlogs.sort(likeComparator)
        setBlogs(initialBlogs)
      })
  }

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setNotification('')
    }, 5000)
    getBlogs()
  }, [notification])

  if(user === null && typeof localStorage.getItem('token') === 'string'){
    setUser({ token: localStorage.getItem('token'), name: localStorage.getItem('name'), username: localStorage.getItem('username') })
    blogService.setToken(localStorage.getItem('token'))
  }

  const updateBlog = async (blog, id) => {
    console.log(id, blog)
    try{
      await blogService.update(blog)
      setNotification('Blog updated')
    } catch(e) {
      setNotification(e.response.data.error)
    }
  }

  const removeBlog = async (id) => {
    try{
      await blogService.deleteBlog(id)
      setNotification('Blog removed')
    } catch(e) {
      setNotification(e.response.data.error)
    }
  }

  const newBlog = (blogObject) => {
    blogService
      .createNew(blogObject)
      .then(res => {
        setNotification(`Blog ${blogObject.title} by ${blogObject.author} created`)
        setBlogs(blogs.concat(res.result))
        console.log(res)
      })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('name')
    setUser(null)
  }

  const login = async (e) => {
    e.preventDefault()
    try{
      const loginUser = await loginService.login({ username, password })
      setUser(loginUser)
      console.log(loginUser)
      blogService.setToken(loginUser.token)
      localStorage.setItem('token', loginUser.token)
      localStorage.setItem('username', loginUser.username)
      localStorage.setItem('name', loginUser.name)
      setUsername('')
      setPassword('')
      setNotification('')
    } catch (exception) {
      setNotification(exception.response.data.error)
    }
  }

  if (user === null) {
    return (
      <div>
        {notification.length > 0 &&
          <Notification text={notification} />
        }
        <h2>Login to bloglist</h2>
        <form onSubmit={login} >
          <div>
            Username
            <input type="text" value={username} name="username" id="username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            Password
            <input type="password" value={password} name="password" id="password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit" id="login-button">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {notification.length > 0 &&
        <Notification text={notification} />
      }
      <h2>blogs</h2>
      {user.name} logged in <button id="logout-button" onClick={logout}>logout</button>
      {newBlogVisible &&
        <Newblog
          newBlog={newBlog}
        />
      }
      <button id="view-new-blog-button" onClick={() => setNewBlogVisible(!newBlogVisible)}>{!newBlogVisible ? 'Add new':'cancel'}</button>
      <div className="blogs">
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            update={updateBlog}
            removeThisBlog={removeBlog} />
        )}
      </div>
    </div>
  )

}


export default App
