import axios from 'axios'
const baseUrl = '/api/blogs'


const getToken = () => {
  return `bearer ${localStorage.getItem("token")}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async object => {
  const config = {
    headers: { Authorization: getToken() }
  }
  const req = await axios.post(baseUrl, object, config)
  return req.data
}

const update = async object => {
  const config = {
    headers : { Authorization: getToken() }
  }
  const req = axios.post(`${baseUrl}/edit/${object.id}`, object, config)
  return req
}

const deleteBlog = async id => {
  const config = {
    headers : { Authorization: getToken() }
  }
  const req = axios.delete(`${baseUrl}/${id}`, config)
  return req
}

const comment = async (comment, id) => {
  const req = axios.post(`${baseUrl}/comment`, {comment, id})
  return req
}

export default { getAll, createNew, update, deleteBlog, comment }