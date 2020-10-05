import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const Newblog = () => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    dispatch(createBlog(blogObject))
    dispatch(notify(`Blog ${blogObject.title} by ${blogObject.author} created`))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return(
    <div className="new-blog">
      <h1>Create new</h1>
      <form onSubmit={addBlog}>
        <div className="form-field">
          <label for="new-title">Title</label>
          <input type="text" value={newTitle} id="new-title" name="title" onChange={({ target }) => setNewTitle(target.value)} />
        </div>
        <div className="form-field">
          <label for="new-author">Author</label>
          <input type="text" value={newAuthor} id="new-author"  name="author" onChange={({ target }) => setNewAuthor(target.value)} />
        </div>
        <div className="form-field">
          <label for="new-url">URL</label>
          <input type="text" value={newUrl} id="new-url"  name="url" onChange={({ target }) => setNewUrl(target.value)} />
        </div>
        <button id="new-blog-button" type="submit">Create</button>
      </form>
    </div>
  )
}

export default Newblog