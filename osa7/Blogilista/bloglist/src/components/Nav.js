import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../reducers/userReducer'

const Nav = () => {
    const dispatch = useDispatch()
  const user = useSelector(state => state.user)
    
  const logout = () => {
    dispatch(logOut())
    window.location = "/"
  }

    return(
        <div className="top-nav">
            <Link className="nav-element" to={'/users/'} >USERS</Link>
            <Link className="nav-element" to={'/'}>BLOGS</Link>
            <div className="nav-element-right">{user.name} logged in <button id="logout-button" color="primary" variant="contained" onClick={logout}>logout</button></div>
        </div>
    )
}

export default Nav