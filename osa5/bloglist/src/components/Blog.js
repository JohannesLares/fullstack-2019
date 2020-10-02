import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, update, removeThisBlog }) => {
  const [ visible, setVisible ] = useState(false)
  const visibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: '1px solid gray'
  }

  const likeBlog = async () => {
    const blogUpdate = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes+1
    }
    update(blogUpdate, blog.id)
  }

  const remove = async () => {
    if(!window.confirm(`remove ${blog.title}?`)) return
    removeThisBlog(blog.id)
  }

  return(
    <div style={blogStyle} id={blog.title+blog.author}>
      <span onClick={visibility}>{blog.title}</span> {blog.author}
      {visible &&
        <div>
          {blog.url}<br />
          <span className="likes">{blog.likes}</span><button className="like-button" onClick={likeBlog}>Like</button><br />
          added by {blog.user.name}<br />
          {blog.user.username === localStorage.getItem('username') &&
            <button id="remove-button" onClick={remove}>Remove</button>
          }
        </div>
      }
      <button id="view-button" onClick={visibility}>{visible ? 'hide' : 'view'}</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  removeThisBlog: PropTypes.func.isRequired
}

export default Blog