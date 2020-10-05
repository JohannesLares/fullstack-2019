import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { likeBlog, commentBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const BlogView = () => {
    const blogs = useSelector(state => state.blog)
    const [blog, setBlog] = useState({})
    const dispatch = useDispatch()
    const id = useParams().id

    const commentfld = useField('text')

    useEffect(() => {
        const blg = blogs.find(b => b.id === id)
        setBlog(blg)
    }, [blogs])

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

      const cmmnt = (e) => {
          e.preventDefault()
          dispatch(commentBlog({comment: commentfld.value, id: blog.id}))
      }

    return(
        <div className="main">
        {(blog && blog.user) &&
            <div>
                <h1>{blog.title}</h1>
                <a href={blog.url}>{blog.url}</a>
                <p>{blog.likes} likes <button id="like-button" onClick={likeThisBlog}>Like 	&#x1F44D;</button></p>
                <p>added by {blog.user.name}</p>
                <input {...commentfld} id="comment-input" /><button id="comment-button" onClick={cmmnt} >Comment</button>
                <ul>
                    {
                        blog.comments.map(comment => <li>{comment.comment}</li>)
                    }
                </ul>
            </div>
        }
        </div>
    )
}

export default BlogView