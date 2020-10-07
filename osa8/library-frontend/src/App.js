
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useSubscription } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { BOOK_ADDED, ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [rec, setRec] = useState()
  const [user, setUser] = useState()
  const result = useQuery(ME)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      let d = subscriptionData.data.bookAdded
      alert("New book added: " + d.title + " by " + d.author.name + " published: " + d.published)
    }
  })

  const client = useApolloClient()

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setToken(null)
    client.resetStore()
  }

  const recommended = (e) => {
    e.preventDefault()
    setPage('books')
    setRec(user.favoriteGenre)
  }

  const normal = (e) => {
    e.preventDefault()
    setPage('books')
    setRec(null)
  }

  useEffect(() => {
    setPage('books')
  }, [token])

  useEffect(() => {
    if( result.data ) {
      setUser(result.data.me)
    }
  }, [result])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={normal}>books</button>
        {(token) ?
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={recommended}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
          :
          <button onClick={() => setPage('login')}>Login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
        recommended={rec}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
      />

    </div>
  )
}

export default App