import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';

function Notification() {
  const [requests, setRequests] = useState([]);

  // Fetch all requests from backend
  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:8801/api/requests/allRequests');
      setRequests(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };


  // Load data on component mount and on 'request-submitted' event
  useEffect(() => {
    fetchRequests();
    window.addEventListener('request-submitted', fetchRequests);
    return () => window.removeEventListener('request-submitted', fetchRequests);
  }, []);

  return (
    <div>
      <Header />
      <div>
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
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.department}</td>
                  <td>{req.machine_code}</td>
                  <td>{req.type}</td>
                  <td>{req.description}</td>
                  <td>{req.employee_name}</td>
                  <td>{new Date(req.created_at || req.date_time).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-info">View</button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1">Pending</button>
                    <button className="btn btn-sm btn-outline-success me-1">Approve</button>
                    <button className="btn btn-sm btn-outline-danger">Reject</button>
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
    </div>
  );
}

export default Notification;

/*import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
=======
import Header from '../Header/Header'

//import { Link } from 'react-router-dom'


function Notification() {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {

        try{
            const res = await axios.get('http://localhost:8801/api/requests/addrRequest');
            setRequests(res.data.requests || [])
        }catch(err){
            console.log(err)
        }

function Notification(){

    //Table data state to store fetched requests
    const [requests,setRequests] = useState([]);

    //Fetch all requets from backend
    const fetchRequests = async () => {
        try{
            const res = await axios.get('http://localhost:8801/api/notification')
            /*setRequests(res.data.requests || [])*/
            /*.then(res => setRequests(res.data))
        }catch(err){
            console.log(err)
        }  

        try {
            const res = await axios.get('http://localhost:8800/api/Notification');
            setRequests(res.data.requests || []);
        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {
        fetchRequests();
        window.addEventListener('request-submitted', fetchRequests);
    return () => window.removeEventListener('request-submitted', fetchRequests);
    }, []);

    }


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
                            <button className="btn btn-sm btn-outline-primary" formAction=''>Pending</button>
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

*/