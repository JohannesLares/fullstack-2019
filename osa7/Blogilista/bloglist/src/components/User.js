import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Users = () => {
    const blogs = useSelector(state => state.blog)
    const [usersBlogs, setUsersBlogs] = useState([])
    const [name, setName] = useState("")
    const id = useParams().id
    useEffect(() => {
        let arr = []
        for (var i in blogs) {
            if(blogs[i].user.id !== id) continue
            arr.push(blogs[i])
            if (name === "") setName(blogs[i].user.name)
        }
        setUsersBlogs(arr)
    }, [blogs])

    return(
        <div className="main">
            <h1>{name}</h1>
            <h3>Added blogs</h3>
            <ul>
            {
                usersBlogs.map(blog => <li>{blog.title}</li>)
            }
            </ul>
        </div>
    )
}

export default Users