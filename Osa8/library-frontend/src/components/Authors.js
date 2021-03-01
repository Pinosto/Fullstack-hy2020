import React, { useEffect, useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { ADD_YEAR_OF_BORN, ALL_AUTHORS } from '../queries'


const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [authors, setauthors] = useState([])
  const [year, setYear] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    if (result.data) {
      setauthors(result.data.allAuthors)
    }
  }, [result.data])

  const [addYearOfBorn] = useMutation(ADD_YEAR_OF_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    }
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div><h2>authors</h2>loading...</div>
  }
  const addYear = (e) => {
    e.preventDefault()
    addYearOfBorn({ variables: { name: author, setBornTo: year } })
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
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token &&
        <div>
          <h2>set birthday</h2>
          <form onSubmit={addYear}>
            <div>
              <label>author </label>
              <label>
                <select value={author} onChange={({ target }) => setAuthor(target.value)}>
                  <option value="">--Please choose author--</option>
                  {authors.map(a =>
                    <option key={a.name} value={a.name}>{a.name}</option>
                  )}
                </select>
              </label>
            </div>
            <div>
              <label>born </label>
              <input
                placeholder='year'
                onChange={({ target }) => setYear(Number(target.value))} />
            </div>
            <div>
              <button type='submit'>update author</button>
            </div>
          </form>
        </div>
      }
    </div>
  )
}

export default Authors
