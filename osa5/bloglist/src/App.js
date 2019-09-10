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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState('')
  const [newBlogVisible, setNewBlogVisible] = useState(false)

  const likeComparator = (a, b) => {
    if(a.likes > b.likes) return -1
    if(b.likes > a.likes) return 1
    return 0
  }

  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => {
        initialBlogs.sort(likeComparator)
        setBlogs(initialBlogs)
      })
  }, [])

  if(user === null && typeof localStorage.getItem('token') === 'string'){
    setUser({ token: localStorage.getItem('token'), name: localStorage.getItem('name'), username: localStorage.getItem('username') })
    blogService.setToken(localStorage.getItem('token'))
  }

  const updateBlog = async (blog) => {
    try{
      await blogService.update(blog)
      setNotification('Blog updated')
    } catch(e) {
      setNotification(e.response.data.error)
    }
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const removeBlog = async (id) => {
    try{
      await blogService.deleteBlog(id)
      setNotification('Blog removed')
    } catch(e) {
      setNotification(e.response.data.error)
    }
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const newBlog = async (e) => {
    e.preventDefault()
    try{
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      const createBlog = await blogService.createNew(newBlog)

      setNotification(`Blog ${createBlog.title} by ${createBlog.author} created`)
    }catch (exception){
      setNotification('Something went wrong')
    }
    setTimeout(() => {
      setNotification('')
    }, 5000)
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
            <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            Password
            <input type="password" value={password} name="username" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">Login</button>
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
      {user.name} logged in <button onClick={logout}>logout</button>
      {newBlogVisible &&
        <Newblog
          author={author}
          title={title}
          url={url}
          setUrl={setUrl}
          setAuthor={setAuthor}
          setTitle={setTitle}
          newBlog={newBlog}
        />
      }
      <button onClick={() => setNewBlogVisible(!newBlogVisible)}>{!newBlogVisible ? 'Add new':'cancel'}</button>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          update={updateBlog}
          removeThisBlog={removeBlog} />
      )}
    </div>
  )

}


export default App
