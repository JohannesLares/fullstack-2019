import React, { useState } from 'react'

const Newblog = ({ newBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    newBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return(
    <div>
      <h1>Create new</h1>
      <form onSubmit={addBlog}>
        <div>
                    Title
          <input type="text" value={newTitle} id="new-title" name="title" onChange={({ target }) => setNewTitle(target.value)} />
        </div>
        <div>
                    Author
          <input type="text" value={newAuthor} id="new-author"  name="author" onChange={({ target }) => setNewAuthor(target.value)} />
        </div>
        <div>
                    URL
          <input type="text" value={newUrl} id="new-url"  name="url" onChange={({ target }) => setNewUrl(target.value)} />
        </div>
        <button id="new-blog-button" type="submit">Create</button>
      </form>
    </div>
  )
}

export default Newblog