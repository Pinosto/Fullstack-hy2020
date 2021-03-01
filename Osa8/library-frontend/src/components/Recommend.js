import React, { useEffect, useState } from 'react'

import {  useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
    const result = useQuery(ALL_BOOKS)
    const resultuser = useQuery(ME)
    const [books, setbooks] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        resultuser.data && setUser(resultuser.data.me)
    }, [resultuser.data])

    useEffect(() => {
        result.data && setbooks(result.data.allBooks)
    }, [result.data])

    if (!props.show) {
        return null
    }
    if (books && user) {
        return (
            <div>
                <h2>recommendations</h2>
                <p >Books in your favorite genre <span style={{ fontWeight: "bold" }}>{user?.favoriteGenre}</span></p>
                <table>
                    <tbody>
                        <tr>
                            <th></th><th>author</th><th>published</th>
                        </tr>
                        {books
                            .filter(b => b.genres.includes(user.favoriteGenre))
                            .map(a =>
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
    return (
        <div>
            <h2>loading...</h2>
        </div>
    )
}

export default Recommend
