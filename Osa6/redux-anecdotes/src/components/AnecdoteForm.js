import React from 'react'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'


const AnecdoteForm = ({newAnecdote, addNotification}) => {
    // const dispatch = useDispatch()

    const addAnecdote =async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        // dispatch(newAnecdote(content))
        // dispatch(addNotification(`new anecdote, ${content}`,10))
        newAnecdote(content)
        addNotification(`new anecdote, ${content}`,10)
      }
    return (
        <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
        </div>
    )
}

// export default AnecdoteForm
export default connect(
  null,
  {newAnecdote, addNotification}
)(AnecdoteForm)
