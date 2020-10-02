import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async object => {
  const config = {
    headers: { Authorization: token }
  }
  const req = await axios.post(baseUrl, object, config)
  return req.data
}

const update = async object => {
  const config = {
    headers : { Authorization: token }
  }
  const req = axios.post(`${baseUrl}/edit/${object.id}`, object, config)
  return req
}

const deleteBlog = async id => {
  const config = {
    headers : { Authorization: token }
  }
  const req = axios.delete(`${baseUrl}/${id}`, config)
  return req
}

export default { getAll, createNew, setToken, update, deleteBlog }