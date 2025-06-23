import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import axios from 'axios'

function EngineerDashboard() {

    const [users,setUser] = useState([])


    useEffect(()=>{
        const fetchAllData = async()=>{
            try{
                const res = await axios.get("http://localhost:8800/Engineer")
                setUser(res.data.users || [])
            }catch(err){
                console.error(err)
            }
        }
        fetchAllData()
    },[])

  return (
    <div>
        <div>
            <Header />
            <Link className='btn tn-success' to={'/Register'} > Add Employee</Link>


            <div className='div0-01'>
                <table className='table table-stripped'>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>User Name</th>
                            <th scope='col'>E Mail</th>
                            <th scope='col'>Position</th>
                            <th scope='col'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length===0?(
                            <tr>
                               <td colSpan="5">No Users Available</td> 
                            </tr>
                        ):(
                            users.map((user)=>(
                                <tr key={user.empNum}>
                                    <td>{user.empNum}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.position}</td>
                                    <td>{user.status}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default EngineerDashboard
