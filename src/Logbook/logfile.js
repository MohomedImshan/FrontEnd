import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'

function Logfile() {
  const [log, setLog] = useState([])
  const [filteredLog, setFilteredLog] = useState([])
  const [loading, setLoading] = useState(true)
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No token found')
      return
    }

    axios.get(`${process.env.REACT_APP_API_URL}/logfile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setLog(res.data.log)
        setFilteredLog(res.data.log)  
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

 
  const handleSearch = () => {
    const filtered = log.filter(item => {
      const date = new Date(item.timestamp);

      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      if (from && date < from) return false;

      if (to) {
        to.setHours(23, 59, 59, 999); 
        if (date > to) return false;
      }

      return true;
    });

    setFilteredLog(filtered);
  };

  
  const resetFilter = () => {
    setFromDate("");
    setToDate("");
    setFilteredLog(log);
  };

  return (
    <div>
      <Header />

      <div className="container p-4">

        <h2>Weekly Log</h2>

        {/* Date Filters */}
        <div className="mb-3 d-flex align-items-center">
          
          <label className="me-2">From: </label>
          <input
            type="date"
            className="form-control me-4"
            style={{ width: "200px" }}
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
          />

          <label className="me-2">To: </label>
          <input
            type="date"
            className="form-control me-3"
            style={{ width: "200px" }}
            value={toDate}
            onChange={e => setToDate(e.target.value)}
          />

          
          <button
            className="btn btn-primary me-2"
            onClick={handleSearch}
          >
            Search
          </button>

          
          <button
            className="btn btn-secondary"
            onClick={resetFilter}
          >
            Reset
          </button>

        </div>

        <br />

        {loading ? (
          <p>Loading log...</p>
        ) : filteredLog?.length ? (

          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Action</th>
                <th>Details</th>
                <th>Date & Time</th>
              </tr>
            </thead>

            <tbody>
              {filteredLog.map((r) => (
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

        ) : (
          <p>No log file found</p>
        )}

      </div>
    </div>
  )
}

export default Logfile
