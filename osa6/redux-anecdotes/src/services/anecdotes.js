import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const createNew = async (anecdote) => {
    const obj = { content: anecdote.content, votes: 0, id: anecdote.id }
    const res = await axios.post(baseUrl, obj)
    return res.data
}

const update = async (content) => {
    const res = await axios.put(baseUrl+'/'+content.id, {
        votes: content.votes+1,
        content: content.content
    })
    return res.data
}

export default { getAll, createNew, update }