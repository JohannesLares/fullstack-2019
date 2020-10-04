import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificatioReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if ( state.filter === '' ) {
            return state.anecdotes
        }
        return state.anecdotes.filter(an => {
            if( an.content.includes(state.filter)) return an
        })
    })
    const dispatch = useDispatch()

    const vote = async (id) => {
        dispatch(notify("You voted \'"+anecdotes.find(a => a.id === id ).content+"'", 10))
        dispatch(upVote(anecdotes.find(a => a.id === id )))
    }

    return(
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList