import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { logIn } from '../reducers/userReducer'

const Login = () => {

    const dispatch = useDispatch()

    const username = useField('text')
    const password = useField('password')

    const login = async (e) => {
        e.preventDefault()
        try{
          dispatch(logIn(username.value, password.value))
          e.target.value = ""
          username.onChange(e)
          password.onChange(e)
        } catch (exception) {
          dispatch(notify(exception.response.data.error))
        }
    }

    return (
        <div className="main">
          <h2>Login to bloglist</h2>
          <form onSubmit={login} >
            <div className="form-field">
              <label>Username</label>
              <input {...username} />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input {...password} />
            </div>
            <button type="submit" id="login-button">Login</button>
          </form>
        </div>
      )
}


export default Login