import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const [ visible, setVisible ] = useState(false)
  const dispatch = useDispatch()

  console.log(blog)

  const likeThisBlog = () => {
    const blogUpdate = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes+1
    }
    dispatch(likeBlog(blogUpdate))
    dispatch(notify('Blog updated'))
  }

  const remove = async () => {
    if(!window.confirm(`remove ${blog.title}?`)) return
    dispatch(removeBlog(blog.id))
    dispatch(notify('Blog removed'))
  }

  return(
    <div className="blog" id={blog.title+blog.author}>
      <span><Link to={'/blog/'+blog.id}>{blog.title}</Link></span> {blog.author}
      {visible &&
        <div>
          {blog.url}<br />
          <span className="likes">{blog.likes}</span><button className="like-button" onClick={likeThisBlog}>Like</button><br />
          added by {blog.user.name}<br />
          {blog.user.username === localStorage.getItem('username') &&
            <button id="remove-button" onClick={remove}>Remove</button>
          }
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog