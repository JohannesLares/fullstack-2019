import React from 'react'

const Newblog = ({
  newBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl
}) => {
  return(
    <div>
      <h1>Create new</h1>
      <form onSubmit={newBlog}>
        <div>
                    Title
          <input type="text" value={title}  name="title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
                    Author
          <input type="text" value={author}  name="author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
                    URL
          <input type="text" value={url}  name="url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default Newblog