import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Header from '../Header/Header.js'

// import { Link } from 'react-router-dom'

function Notification(){

    //Table data state to store fetched requests
    const [requests,setRequests] = useState([]);

    //Fetch all requets from backend
    const fetchRequests = async () => {
        try{
            const res = await axios.get('http://localhost:8800/api/requests');
            setRequests(res.data.requests || [])
        }catch(err){
            console.log(err)
        }
        
    };

    //Load data on component mount
    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div>
            <Header />
          <h1 className='text-center'>Request Notifications</h1>
          <div className='table-notification'>
            <table className='table table-striped table-hover table-bordered'>
            <thead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Department</th>
                    <th scope='col'>Machine Code</th>
                    <th scope='col'>Type</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>Employee Name</th>
                    <th scope='col'>Date & Time</th>
                    <th scope='col'>View Request</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>
            <tbody>
                {requests.map(req=>(
                    <tr key={req.id}>
                        <td>{req.department}</td>
                        <td>{req.machine_code}</td>
                        <td>{req.type}</td>
                        <td>{req.description}</td>
                        <td>{req.employee_name}</td>
                        <td>{new Date(req.date_time).toLocaleString()}</td>
                        <td>
                            <button className="btn btn-sm btn-outline-info">View</button>
                        </td>
                        <td>
                            <button className="btn btn-sm btn-outline-primary">Pending</button>
                            <button className="btn btn-sm btn-outline-success me-2">Approve</button>
                            <button className="btn btn-sm btn-ouline-danger">Reject</button>
                        </td>
                        <td> 
                            <button className="btn btn-sm btn-outline-success me-2">Update</button>
                            <button className="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
          </div>
        </div> 
   );
}

export default Notification;

