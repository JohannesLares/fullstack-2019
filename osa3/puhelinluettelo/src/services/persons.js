import axios from 'axios'
const url = 'http://localhost:3001/api'

const getPersons = () => {
    return axios.get(`${url}/persons`)
}

const createPerson = person => {
    return axios.post(`${url}/newPerson`, person)
}

const updatePerson = (id, update) => {
    const req = axios.put(`${url}/persons/${id}`, update)
    return req.then(response => {
        return response
    })
}

const deletePerson = id => {
    const request = axios.delete(`${url}/deletePerson/${id}`)
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