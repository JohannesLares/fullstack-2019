import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Books = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [ login, result ] = useMutation(LOGIN)

    useEffect(() => {
        if( result.data ) {
            const token = result.data.login.value
            localStorage.setItem("token", token)
            props.setToken(token)
        }
    }, [result.data])

    const handleSubmit = (event) => {
        event.preventDefault()
        login({ variables: { username, password }})
    }

  if (!props.show) {
    return null
  }

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Username
        <input type="text" value={username} onChange={({target}) => setUsername(target.value)} /><br />
        Password
        <input type="password" value={password} onChange={({target}) => setPassword(target.value)} />
        <input type="submit" value="Login!" />
      </form>
    </div>
  )
}

export default Books