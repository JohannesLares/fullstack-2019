import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificatioReducer'

const AnecdoteForm = (props) => {

    const create = async (event) => {
        event.preventDefault()
        props.notify("You created \'"+event.target.anecdote.value+"'", 5)
        props.newAnecdote(event.target.anecdote.value)
        event.target.anecdote.value = ''
    }

    return(
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

const mapStateToProps = (state) => {
    return {anecdotes: state.ancdotes}
}

const mapDispatchToProps = {
    notify,
    newAnecdote
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm