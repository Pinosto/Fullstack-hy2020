import React from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'




const AnecdoteList = (props) => {
    // const anecdotes = useSelector(state => state.anecdotes)
    // const filter = useSelector(state => state.filter)
    // const dispatch = useDispatch()

    const vote = async (anecdote) => {
        props.addVote(anecdote)
        props.addNotification(`you voted '${anecdote.content}'`, 5)

    }

    return (
        <div>
            {props.anecdotes
                .filter(anecdote => anecdote.content.includes(props.filter))
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    addVote,
    addNotification,
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteList)

export default ConnectedAnecdotes
