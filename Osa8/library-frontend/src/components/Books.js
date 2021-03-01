import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { genreList } from './genreList'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filterBooks, filteredResult] = useLazyQuery(ALL_BOOKS,{fetchPolicy:'network-only'})
  const [genre, setGenre] = useState("allGenres")
  const [books, setbooks] = useState([])
  const [filteredBooks, setfilteredBooks] = useState(null)

  useEffect(() => {
    result.data && setbooks(result.data.allBooks)
  }, [result.data])

  useEffect(() => {
    filteredResult.data && setfilteredBooks(filteredResult.data.allBooks)
  }, [filteredResult.data])

  if (!props.show) {
    return null
  }
  if (result.loading&&filteredResult.loading) {
    return <div><h2>books</h2>loading...</div>
  }

  const handleFilter = (e) => {
    setGenre(e.target.value)
    e.target.value === 'allGenres' ? setfilteredBooks(null) :
      filterBooks({ variables: { filterByGenre: e.target.value } })

  }

  return (
    <div>
      <h2>books</h2>
      <label>filter</label>
      <label>
        <select value={genre} onChange={handleFilter}>
          <option value="allGenres">all genres</option>
          {genreList.map(g =>
            <option key={g} value={g}>{g}</option>
          )}
        </select>
      </label>

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
          {filteredBooks ? 
          filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )
          :
          books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books