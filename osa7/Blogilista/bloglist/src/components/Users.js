import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

const Users = () => {
    const blogs = useSelector(state => state.blog)
    const [persons, setPersons] = useState([])
    useEffect(() => {
        let arr = {}
        for (var i in blogs) {
            if(arr[blogs[i].user.id]) {
                arr[blogs[i].user.id].val++
            } else {
                arr[blogs[i].user.id] = {}
                arr[blogs[i].user.id].val = 1
                arr[blogs[i].user.id].name = blogs[i].user.name
                arr[blogs[i].user.id].id = blogs[i].user.id
            }
        }
        console.log(arr)
        var arr2 = []
        for (var i in arr) {
            arr2.push({name:arr[i].name, amnt: arr[i].val, id: arr[i].id})
        }
        console.log(arr, arr2)
        setPersons(arr2)
    }, [blogs])

    return(
        <div className="main">
            <h1>Users</h1>
            <table className="user-table">
                <tr><th></th><th>Blogs created</th></tr>
                {
                    persons.map(person => <tr><td><Link to={'/user/'+person.id} >{person.name}</Link></td><td>{person.amnt}</td></tr>)
                }
            </table>
        </div>
    )
}

export default Users