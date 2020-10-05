import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Newblog from './Newblog'
import Blog from './Blog'

const Blogs = () => {
    const [newBlogVisible, setNewBlogVisible] = useState(false)
    
    const blogs = useSelector(state => state.blog)

    return (
        <div className="main">
            <h1>Blogs</h1>
            {newBlogVisible &&
                <Newblog />
            }
            <button id="view-new-blog-button" onClick={() => setNewBlogVisible(!newBlogVisible)}>{!newBlogVisible ? 'Add new':'cancel'}</button>
            <div className="blogs">
                {blogs.map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog} />
                    )}
            </div>
        </div>
      )
}


export default Blogs