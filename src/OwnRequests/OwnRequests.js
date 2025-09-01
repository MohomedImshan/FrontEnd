// File: src/Request/Notification.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';

function OwnRequests() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  


  const fetchRequests = async () => {
    try {
        const empNum= localStorage.getItem('empNum')
      const res = await axios.get(`http://localhost:8800/ownrequests/${empNum}`);
      setRequests(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
    window.addEventListener('request-submitted', fetchRequests);
    return () => window.removeEventListener('request-submitted', fetchRequests);
  }, []);

  const filteredRequests = requests.filter(req =>
    Object.values(req).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const openModal = (req) => setSelectedRequest(req);
  const closeModal = () => setSelectedRequest(null);

  

 

  return (
    <div>
      <Header />
      <div className='container'>
        <h1 className='text-center'>Request Notifications</h1>
        <input
          type="text"
          placeholder="Search"
          className="form-control mb-3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className='table table-striped table-hover table-bordered'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Department</th>
              <th>Machine Code</th>
              <th>Type</th>
              <th>Description</th>             
              <th>Date & Time</th>
              <th>View</th>
              <th>Status</th>
             
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(req => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.department}</td>
                <td>{req.machine_code}</td>
                <td>{req.type}</td>
                <td>{req.description}</td>
                
                
                <td>{new Date(req.created_at || req.date_time).toLocaleString()}</td>
                <td>
                  <button onClick={() => openModal(req)} className="btn btn-sm btn-outline-info">View</button>

                </td>
                <td>{req.status}</td>
            
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal to view details */}
        {selectedRequest && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content p-3">
                <h5>Request Details</h5>
                <p><strong>Department:</strong> {selectedRequest.department}</p>
                <p><strong>Type:</strong> {selectedRequest.type}</p>
                <p><strong>Description:</strong> {selectedRequest.description}</p>
                <h6 className="mt-3">Spare Parts</h6>
                <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedRequest.length > 0 ? (
                            selectedRequest.map((p, index) => (
                              <tr key={index}>
                                <td>{p.id}</td>
                                <td>{p.item_name}</td>
                                <td>{p.quantity}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" className="text-center">No parts added</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                <button className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal to edit request */}
        

      </div>
    </div>
  );
}

export default OwnRequests;
