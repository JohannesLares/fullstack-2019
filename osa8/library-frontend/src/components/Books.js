import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [buttons, setButtons] = useState()
  const [filter, setFilter] = useState(null)

  useEffect(() => {
    if( result.data ) {
      let arr = []
      result.data.allBooks.map(b => arr=arr.concat(b.genres))
      arr.filter((a, i) => arr.indexOf(a) === i)
      setButtons(arr)
    }
  }, [result])

  useEffect(() => {
    if( !filter && props.recommended ) {
      setFilter(props.recommended)
    } else if (filter && props.recommended === null) {
      setFilter(null)
    }
  }, [props])

  if (!props.show || result.loading) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.map(a => {
            if ((filter && a.genres.includes(filter)) || !filter) {
              return (<tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>)
            }
            return
        })}
        </tbody>
      </table>
      {(buttons && !props.recommended) &&
        <>
          {buttons.map(b => <button onClick={()=>setFilter(b)}>{b}</button>)}
          <button onClick={()=>setFilter(null)}>All</button>
        </>
      }
    </div>
  )
}

export default Books