// File: src/Request/Notification.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';

const API = 'http://localhost:8800/api';

function OwnRequests() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedParts, setSelectedParts] = useState([]);
  const [editRequest, setEditRequest] = useState(null);
  const [editRequestData, setEditRequestData] = useState({});
  const [deleteRequest, setDeleteRequest] = useState(null);

  


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

  
  const handleEdit = (row) => {
    setEditRequest(row);
    setEditRequestData({
      empNum: row.empNum ?? row.empNumber ?? '',
      department: row.department ?? '',
      machine_code: row.machine_code ?? '',
      type: row.type ?? '',
      description: row.description ?? '',
      userName: row.userName ?? ''
    });
  };

  const handleUpdate = async () => {
    if (!editRequest) return;
    try {

      await axios.put(`${API}/requests/${editRequest.id}`, editRequestData);

      setEditRequest(null);
      fetchRequests();
    } catch (error) {
      console.error('Update failed', error);
      alert('Update failed');
    }
  };

 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this request?")) {
    return; // stop if user cancels
  }
  try {
    await axios.delete(`${API}/requests/${id}`);
    fetchRequests(); // refresh table
    setDeleteRequest(null); // close modal
  } catch (e) {
    console.error('Delete failed', e);
    alert('Delete failed');
  }
};


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
                
                
                <td>{new Date(req.created_at || req.date_time).toLocaleString()}</td>
                <td>
                  <button onClick={() => openModal(req)} className="btn btn-sm btn-outline-info">View</button>

                </td>

                <td>{req.status}</td>
                <td className="text-nowrap">
                    <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleEdit(req)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(req.id)}>Delete</button>
                  </td>


              </tr>
            ))}
          </tbody>
        </table>

        {/* View Modal */}
        {selectedRequest && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content p-3">
                <h5>Request Details</h5>
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Emp No:</strong> {selectedRequest.empNum ?? selectedRequest.empNumber ?? '-'}</p>
                    <p><strong>Department:</strong> {selectedRequest.department}</p>
                    <p><strong>Machine Code:</strong> {selectedRequest.machine_code}</p>
                    <p><strong>Type:</strong> {selectedRequest.type}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Employee:</strong> {selectedRequest.userName}</p>
                    <p><strong>Status:</strong> {selectedRequest.status}</p>
                    <p><strong>Created:</strong> {selectedRequest.created_at ? new Date(selectedRequest.created_at).toLocaleString() : '-'}</p>
                    <p><strong>Date Of Action:</strong> {selectedRequest.approved_date ? new Date(selectedRequest.approved_date).toLocaleString() : '-'}</p>
                  </div>
                </div>
                <p><strong>Description:</strong> {selectedRequest.description}</p>


                <p><strong>Spare Parts:</strong> {selectedRequest.spareParts}</p>

                <button className="btn btn-secondary" onClick={closeModal}>Close</button>


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
                          {selectedParts.length > 0 ? (
                            selectedParts.map((p, index) => (
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


                <div className="text-end">
                  
                  <button className="btn btn-secondary" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Edit Modal */}
        {editRequest && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content p-3">
                <h5>Edit Request</h5>
                    <p><strong>Emp No:</strong></p>
                    <input className="form-control mb-2" value={editRequestData.empNum} onChange={(e) => setEditRequestData({ ...editRequestData, empNum: e.target.value })} placeholder="Emp Number" disabled/> 
                    
                    <p><strong>Department:</strong></p>
                    <select className="form-control" value={editRequestData.department} onChange={(e) => setEditRequestData({ ...editRequestData, department: e.target.value })}required >
                      <option value="">-- Select Department --</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="General">General</option>
                    </select>
            
                    <p><strong>Machine Code:</strong></p>
                    <input className="form-control mb-2" value={editRequestData.machine_code} onChange={(e) => setEditRequestData({ ...editRequestData, machine_code: e.target.value })} placeholder="Machine Code" />

                    <p><strong>Type:</strong></p>
                    <input className="form-control mb-2" value={editRequestData.type} onChange={(e) => setEditRequestData({ ...editRequestData, type: e.target.value })} placeholder="Type" />

                    <p><strong>Employee:</strong></p>
                    <input className="form-control mb-3" value={editRequestData.userName} onChange={(e) => setEditRequestData({ ...editRequestData, userName: e.target.value })} placeholder="Employee Name" />

                    <p><strong>Description:</strong></p>
                    <textarea className="form-control mb-2" value={editRequestData.description} onChange={(e) => setEditRequestData({ ...editRequestData, description: e.target.value })} placeholder="Description" />
                
                <div className="text-end">
                  <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
                  <button className="btn btn-secondary" onClick={() => setEditRequest(null)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteRequest && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content p-3">
                <h5 className="mb-3 text-danger">Confirm Delete</h5>
                <p>Are you sure you want to delete this request?</p>
                <p><strong>Request ID:</strong> {deleteRequest.id}</p>
                <p><strong>Description:</strong> {deleteRequest.description}</p>

                <div className="text-end">
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(deleteRequest.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setDeleteRequest(null)}
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        

      </div>
    </div>
  );
}

export default OwnRequests;
