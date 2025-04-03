import React, { useEffect, useState } from 'react'
import axios from "axios"

function User() {
    const [users,setUsers] = useState([])

    useEffect(()=>{
        const fetchAllUsers = async() =>{
            try{
                const res = await axios.get("http://localhost:8801/User")
                setUsers(res.data.users)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllUsers()
    },[])
  return (
    <div>
      <div className='home'>
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
                    {users.length === 0 ?(
                        <tr>
                            <td colSpan='5'>No users</td>
                        </tr>
                    ) : (
                        users.map((user)=>(
                            <tr key={user.empNum}>
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
