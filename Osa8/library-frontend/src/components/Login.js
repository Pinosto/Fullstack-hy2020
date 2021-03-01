import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { LOGIN, ME } from '../queries'
//import { useApolloClient } from '@apollo/client'


const Login = (props) => {

    const [username, setUserame] = useState('')
    const [password, setPassword] = useState('')
    //const client = useApolloClient()
    const [refecthME] = useLazyQuery(ME, {
        fetchPolicy: 'network-only'
    })

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        },
        onCompleted: () => {
            // client.resetStore()
            refecthME()
        },
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('library-user-token', token)
            props.setPage('authors')
        }
    }, [result.data]) // eslint-disable-line

    if (!props.show) {
        return null
    }
    const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
        setUserame('')
        setPassword('')

    }
    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    name
                    <input
                        value={username}
                        onChange={({ target }) => setUserame(target.value)}
                    ></input>
                </div>
                <div>
                    password
                    <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    ></input>
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default Login
