import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getPersons = () => {
    return axios.get(url)
}

const createPerson = person => {
    return axios.post(url, person)
}

const updatePerson = (id, update) => {
    const req = axios.put(`${url}/${id}`, update)
    return req.then(response => {
        return response
    })
}

const deletePerson = id => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => {
        return response
    })
}

export default {
    getPersons: getPersons,
    createPerson: createPerson,
    updatePerson: updatePerson,
    deletePerson: deletePerson
}