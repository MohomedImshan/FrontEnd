import React, { useEffect, useState } from 'react'
import axios from "axios"
import Header from '../Header/Header'
import { Link } from 'react-router-dom'

function User() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get("http://localhost:8800/User")
                setUsers(res.data.users)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllUsers()
    }, [])
    return (
        <div>
            <Header />
            <div className='home'>
                <button className='btn btn-success'><Link to={"/Add-Employee"}>Register Employee</Link></button>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>User Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Position</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan='5'>No users</td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.empNum}>
                                    <td>{user.empNum}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.position}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <button className='btn btn-success'>Edit</button>
                                        <button className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default User
