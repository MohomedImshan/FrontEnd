import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
// import exportPDF from './ReportDownload'

function Logfile() {
    const [log,setlog] = useState([])
    const [loading,setLoading] = useState(true)
    // const [fromDate,setFromDate] = useState("")
    // const [toDate,setToDate]=useState("")

    useEffect(()=>{
      const token = localStorage.getItem('token')
      if(!token){
        console.error('No token found')
        return
      }
        axios.get('http://localhost:8800/logfile',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        .then(res=>{
            setlog(res.data.log)
            setLoading(false)
        })
        .catch(err=>{
            console.error(err)
            setLoading(false)
        })
    },[])

    // const filteredReport = report.filter(r=>{
    //   if(!fromDate||!toDate) return true
    //   const date = new Date(r.date_time||r.created_at)
    //   return date >= new Date(fromDate) && date<= Date(toDate)
    // })

  return (
    <div>
        <Header />
   
    <div className="container p-4">
      
      <h2>Weekly log</h2>
      

      {/* <button className='btn btn-success' onClick={()=>exportPDF(log)}>Download</button><br /> */}
      {/* <div className="mb-3">
        <label>From: </label>
        <input
          type="date"
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
        />
        <label className="ms-3">To: </label>
        <input
          type="date"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
        />
      </div>

      
      <button
        className="btn btn-primary me-2"
        onClick={() => exportPDF(filteredReport)}
      >
        Download PDF
      </button> */}
      
      <br />
      {loading ? (
        <p>Loading log...</p>
      ) : log?.length ?  (
        
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Id </th>
              <th>Action</th>
              <th>Details</th>
              
              <th>Date and Time</th>
              
            </tr>
          </thead>
          <tbody>
            {log.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.empNum}</td>
                <td>{r.action}</td>
                <td>{r.details}</td>
                <td>{new Date(r.timestamp).toLocaleString()}</td>
                

                
              </tr>
            ))}
          </tbody>
        </table>
      ):(
        <p>No logfile Found</p>
      )}
    </div>
    </div>
  )
}

export default Logfile
