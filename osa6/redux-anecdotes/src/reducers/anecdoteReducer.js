import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const voteComparator = (a, b) => {
  if(a.votes > b.votes) return -1
  if(b.votes > a.votes) return 1
  return 0
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'UPVOTE':
      const id = action.data.id
      const voted = action.data
      let arr = state.map(anecdote =>
        anecdote.id !== id ? anecdote : voted  
      )
      arr.sort(voteComparator)
      return arr
    case 'NEW_ANECDOTE': 
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      action.data.sort(voteComparator)
      return action.data
    default:
      return state
  }
}

export const upVote = (anecdote) => {
  return async dispatch => {
    const updatedAne = await anecdoteService.update(anecdote)
    dispatch({
      type: 'UPVOTE',
      data: updatedAne
    })
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew({content, id: getId()})
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
      
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer