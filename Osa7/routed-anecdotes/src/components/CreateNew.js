import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
    const history = useHistory()

    const { reset: contentReset, ...content } = useField({ type: 'text', name: 'content' })
    const { reset: authorReset, ...author } = useField({ type: 'text', name: 'author' })
    const { reset: infoReset, ...info } = useField({ type: 'text', name: 'info' })

    console.log({ content })
    console.log({ contentReset })

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        props.addNotification(`a new anecdote ${content.value} created!`)
        history.push('/')
    }

    const handleReset = () => {
        contentReset()
        authorReset()
        infoReset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
              <input {...content} />
                </div>
                <div>
                    author
              <input {...author} />
                </div>
                <div>
                    url for more info
              <input {...info} />
                </div>
                <button>create</button>
            </form>
            <button onClick={handleReset}>reset</button>
        </div>
    )

}

export default CreateNew
