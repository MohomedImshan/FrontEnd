import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import exportPDF from './ReportDownload'

function Report() {
    const [report,setReport] = useState([])
    const [transaction,setTransaction]=useState([])
    const [stockReport,setStockReport]=useState([])
    const [loading,setLoading] = useState(true)
    // const [fromDate,setFromDate] = useState("")
    // const [toDate,setToDate]=useState("")

    useEffect(()=>{
      const token = localStorage.getItem('token')
      if(!token){
        console.error('No token found')
        return
      }
      axios.get(`${process.env.REACT_APP_API_URL}/report`,{
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
      axios.get(`${process.env.REACT_APP_API_URL}/transaction`,{
        headers:{
           Authorization:`Bearer ${token}`
         }
        })
        .then(res=>{
            setTransaction(res.data.transaction)
            setLoading(false)
        })
        .catch(err=>{
            console.error(err)
            setLoading(false)
        })
        axios.get(`${process.env.REACT_APP_API_URL}/report/stockreport`,{
        headers:{
           Authorization:`Bearer ${token}`
         }
        })
        .then(res=>{
          setStockReport(res.data.stockReport)
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
      
      <h1 className='topic'>Weekly Report</h1>
      

      <button className='btn btn-danger' onClick={()=>exportPDF(report,transaction,stockReport)}>Download</button><br />
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
      <br />
      <hr></hr>
      <h1 className='topic'>Requests for Last Week</h1>
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
              <th>Requested Date</th>
              <th>Approved Date</th>
              
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
                <td>{r.userName}</td>
                <td>{new Date(r.created_at || r.date_time).toLocaleString()}</td>
                <td>{r.approved_date ? new Date(r.approved_date).toLocaleString() : '-'}</td>
                

                
              </tr>
            ))}
          </tbody>
        </table>
      ):(
        <p>No report Found</p>
      )}
      <br />
      <br />
      <hr></hr>
      <h1 className='topic'>Reports of Transaction</h1>
      {loading ? (
        <p>Loading report...</p>
      ) : transaction?.length ?  (
        
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Action</th>
              <th>Item ID</th>
              <th>Items</th>
              <th>Quantity</th>
              <th>Date of Update/Issued/Accepted</th>
              
            </tr>
          </thead>
          <tbody>
            {transaction.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.action}</td>
                <td>{t.item_id}</td>
                <td>{t.item_name}</td>
                <td>{t.quantity}</td>
                <td>{t.date_of_accept	 ? new Date(t.date_of_accept	).toLocaleString() : '-'}</td>

                
              </tr>
            ))}
          </tbody>
        </table>
      ):(
        <p>No report Found for last 7 days</p>
      )}
    </div>
    </div>
  )
}

export default Report
