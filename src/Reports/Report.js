import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import exportPDF from './ReportDownload'

function Report() {
    const [report,setReport] = useState([])
    const [loading,setLoading] = useState(true)
    // const [fromDate,setFromDate] = useState("")
    // const [toDate,setToDate]=useState("")

    useEffect(()=>{
      const token = localStorage.getItem('token')
      if(!token){
        console.error('No token found')
        return
      }
        axios.get('http://localhost:8800/report',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        .then(res=>{
            setReport(res.data.report)
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
    <div className="p-4">
        <Header />
      <h2>Approved Reports</h2>
      

      <button className='btn btn-success' onClick={()=>exportPDF(report)}>Download</button><br />
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
        <p>Loading report...</p>
      ) : report?.length ?  (
        
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
            {report.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.department}</td>
                <td>{r.machine_code}</td>
                <td>{r.type}</td>
                <td>{r.description}</td>
                <td>{r.employee_name}</td>
                <td>{new Date(r.created_at || r.date_time).toLocaleString()}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      ):(
        <p>No report Found</p>
      )}
    </div>
  )
}

export default Report
