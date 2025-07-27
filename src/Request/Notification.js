// File: src/Request/Notification.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';

function Notification() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editRequest, setEditRequest] = useState(null);
  const [editRequestData, setEditRequestData] = useState({});

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:8801/api/requests/allRequests');
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

  const handleEdit = (req) => {
    setEditRequest(req);
    setEditRequestData({
      department: req.department,
      machine_code: req.machine_code,
      type: req.type,
      description: req.description,
      employee_name: req.employee_name,
      spareParts: req.spareParts,
    });
  };

  const handleUpdate = async () => {
    if (!editRequest) return;
    try {
      await axios.put(`http://localhost:8801/api/requests/${editRequest.id}`, editRequestData);
      alert("Request updated!");
      setEditRequest(null);
      fetchRequests();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const deleteRequest = async (id) => {
    if (window.confirm("Delete this request?")) {
      await axios.delete(`http://localhost:8801/api/requests/${id}`);
      fetchRequests();
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8801/api/requests/status/${id}`, { status });
      fetchRequests();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

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
              <th>Employee Name</th>
              <th>Date & Time</th>
              <th>View</th>
              <th>Status</th>
              <th>Action</th>
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
                <td>{req.employee_name}</td>
                <td>{new Date(req.created_at || req.date_time).toLocaleString()}</td>
                <td>
                  <button onClick={() => openModal(req)} className="btn btn-sm btn-outline-info">View</button>
                </td>
                <td>
                  <button onClick={() => updateStatus(req.id, 'Pending')} className="btn btn-sm btn-outline-primary me-1">Pending</button>
                  <button onClick={() => updateStatus(req.id, 'Approved')} className="btn btn-sm btn-outline-success me-1">Approve</button>
                  <button onClick={() => updateStatus(req.id, 'Rejected')} className="btn btn-sm btn-outline-danger">Reject</button>
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleEdit(req)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteRequest(req.id)}>Delete</button>
                </td>
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
                <p><strong>Spare Parts:</strong> {selectedRequest.spareParts}</p>
                <button className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal to edit request */}
        {editRequest && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content p-3">
                <h5>Edit Request</h5>
                <input className="form-control mb-2" value={editRequestData.department} onChange={(e) => setEditRequestData({ ...editRequestData, department: e.target.value })} />
                <input className="form-control mb-2" value={editRequestData.machine_code} onChange={(e) => setEditRequestData({ ...editRequestData, machine_code: e.target.value })} />
                <input className="form-control mb-2" value={editRequestData.type} onChange={(e) => setEditRequestData({ ...editRequestData, type: e.target.value })} />
                <input className="form-control mb-2" value={editRequestData.description} onChange={(e) => setEditRequestData({ ...editRequestData, description: e.target.value })} />
                <input className="form-control mb-2" value={editRequestData.employee_name} onChange={(e) => setEditRequestData({ ...editRequestData, employee_name: e.target.value })} />
                <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditRequest(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Notification;
