import React, { useEffect } from 'react'
import Notification from './components/Notification.js'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import Login from './components/Login'
import Blogs from './components/Blogs'
import BlogView from './components/BlogView'
import User from './components/User'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory
} from "react-router-dom"
import Users from './components/Users'
import Nav from './components/Nav'
import './app.css'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initBlogs())
  }, [])


  return (
    <Router>
      {(user !== null && user.name) &&
        <Nav />
      }
      <Notification />
      
      <Switch>
        <Route path="/" exact>
          {(user === null || !user.name) ? <Login /> : <Blogs /> }
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/user/:id">
          <User />
        </Route>
        <Route path="/blog/:id">
          <BlogView />
        </Route>
      </Switch>
    </Router>
  )

}


export default App
