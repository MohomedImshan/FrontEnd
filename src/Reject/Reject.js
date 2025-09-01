import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
//import exportPDF from './ReportDownload'

function Reject() {
    const [reject,setReject] = useState([])
    const [loading,setLoading] = useState(true)
    // const [fromDate,setFromDate] = useState("")
    // const [toDate,setToDate]=useState("")

    useEffect(()=>{
      const token = localStorage.getItem('token')
      if(!token){
        console.error('No token found')
        return
      }
        axios.get('http://localhost:8800/reject',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        .then(res=>{
            setReject(res.data.reject)
            setLoading(false)
        })
        .catch(err=>{
            console.error(err)
            setLoading(false)
        })
    },[])

    

  return (
    <div>
       <Header />
    
    <div className="p-4">
       
      <h2>Rejected Requests</h2>
      

      
      
      <br />
      {loading ? (
        <p>Loading rejected report...</p>
      ) : reject?.length ?  (
        
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Department</th>
              <th>Machine Code</th>
              <th>Type</th>
              <th>Description</th>
              <th>Employee</th>
              <th>Date</th>
              
            </tr>
          </thead>
          <tbody>
            {reject.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.department}</td>
                <td>{r.machine_code}</td>
                <td>{r.type}</td>
                <td>{r.description}</td>
                <td>{r.userName}</td>
                <td>{new Date(r.created_at || r.date_time).toLocaleString()}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      ):(
        <p>No rejected request found in 7 days</p>
      )}
    </div>
    </div>
  )
}

export default Reject
