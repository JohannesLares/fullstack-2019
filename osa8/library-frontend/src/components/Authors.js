  
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [born, setBorn] = useState()
  const [selected, setSelected] = useState()

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: selected, setBornTo: Number(born) }})
  }

  if (!props.show || result.loading) {
    return null
  }
  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {localStorage.getItem("token") &&
        <form onSubmit={handleSubmit}>
          <select value={selected} onChange={({target}) => setSelected(target.value)} >
            {result.data.allAuthors.map(a => <option value={a.name}>{a.name}</option>)}
          </select>
          <input type="text" value={born} onChange={({target}) => setBorn(target.value)} />
          <input type="submit" value="Save!" />
        </form>
      }
    </div>
  )
}

export default Authors
