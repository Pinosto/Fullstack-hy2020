import React from 'react'

const Anecdote = ({ anecdote }) => {

    const padding = {
        paddingBottom: 10
    }
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <div style={padding}>has {anecdote.votes} votes</div>
            <div style={padding}>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>

        </div>
    )
}

export default Anecdote
