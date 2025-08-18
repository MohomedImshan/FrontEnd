import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import Header from '../Header/Header';

const API = 'http://localhost:8800/api';

function Notification() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedParts, setSelectedParts] = useState([]);
  const [editRequest, setEditRequest] = useState(null);
  const [editRequestData, setEditRequestData] = useState({});

  const searchQuery = useMemo(() => searchTerm.trim(), [searchTerm]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API}/notifications`, {
        params: { search: searchQuery }
      });
      setRequests(res.data || []);
    } catch (err) {
      console.error('Fetch requests failed:', err);
    }
  };

  useEffect(() => {
    fetchRequests();
    const refetch = () => fetchRequests();
    window.addEventListener('request-submitted', refetch);
    return () => window.removeEventListener('request-submitted', refetch);
  }, [searchQuery]);

  const openModal = async (row) => {
    try {
      const res = await axios.get(`${API}/requests/${row.id}`);
      setSelectedRequest(res.data);
      setSelectedParts(res.data.spareParts || []);
    } catch (e) {
      console.error('Fetch single request failed:', e);
      setSelectedRequest(row);
      setSelectedParts([]);
    }
  };
  const closeModal = () => { setSelectedRequest(null); setSelectedParts([]); };

  const handleEdit = (row) => {
    setEditRequest(row);
    setEditRequestData({
      empNum: row.empNum ?? row.empNumber ?? '',
      department: row.department ?? '',
      machine_code: row.machine_code ?? '',
      type: row.type ?? '',
      description: row.description ?? '',
      employee_name: row.employee_name ?? ''
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

  const deleteRequest = async (id) => {

    if (!window.confirm('Delete this request?')) return;
    try {
      await axios.delete(`${API}/requests/${id}`);

      fetchRequests();
    } catch (e) {
      console.error('Delete failed', e);
      alert('Delete failed');
    }
  };

  const updateStatus = async (id, status) => {
    try {

      await axios.put(`${API}/requests/status/${id}`, { status });

      fetchRequests();
    } catch (err) {
      console.error('Status update failed', err);
      alert('Status update failed');
    }
  };

  return (
    <div>
      <Header />
      <div className='container'>
        <h1 className='text-center my-3'>Request Notifications</h1>

        <input
          type="text"
          placeholder="Search anything…"
          className="form-control mb-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="table-responsive">
          <table className='table table-striped table-hover table-bordered align-middle'>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Emp No</th>
                <th>Department</th>
                <th>Machine Code</th>
                <th>Type</th>
                <th>Description</th>
                <th>Employee</th>
                <th>Created</th>
                <th>Approved Date</th>
                <th>View</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.empNum ?? req.empNumber ?? '-'}</td>
                  <td>{req.department}</td>
                  <td>{req.machine_code}</td>
                  <td>{req.type}</td>
                  <td style={{maxWidth: 240}} className="text-truncate">{req.description}</td>
                  <td>{req.employee_name}</td>
                  <td>{req.created_at ? new Date(req.created_at).toLocaleString() : '-'}</td>
                  <td>{req.approved_date ? new Date(req.approved_date).toLocaleString() : '-'}</td>
                  <td>
                    <button onClick={() => openModal(req)} className="btn btn-sm btn-outline-info">View</button>
                  </td>
                  <td className="text-nowrap">
                    <button onClick={() => updateStatus(req.id, 'Pending')} className="btn btn-sm btn-outline-primary me-1">Pending</button>
                    <button onClick={() => updateStatus(req.id, 'Approved')} className="btn btn-sm btn-outline-success me-1">Approve</button>
                    <button onClick={() => updateStatus(req.id, 'Rejected')} className="btn btn-sm btn-outline-danger">Reject</button>
                  </td>
                  <td className="text-nowrap">
                    <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleEdit(req)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteRequest(req.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr><td colSpan="12" className="text-center py-4">No requests found</td></tr>
              )}
            </tbody>
          </table>
        </div>

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
                    <p><strong>Employee:</strong> {selectedRequest.employee_name}</p>
                    <p><strong>Status:</strong> {selectedRequest.status}</p>
                    <p><strong>Created:</strong> {selectedRequest.created_at ? new Date(selectedRequest.created_at).toLocaleString() : '-'}</p>
                    <p><strong>Approved Date:</strong> {selectedRequest.approvedDate ? new Date(selectedRequest.approvedDate).toLocaleString() : '-'}</p>
                  </div>
                </div>
                <p><strong>Description:</strong> {selectedRequest.description}</p>

                <h6 className="mt-3">Spare Parts</h6>
                <ul className="mb-3">
                  {selectedParts.length ? selectedParts.map(p => (
                    <li key={p.id}>{p.part_name} — {p.count}</li>
                  )) : <li>None</li>}
                </ul>

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
                    <input className="form-control mb-2" value={editRequestData.empNum} onChange={(e) => setEditRequestData({ ...editRequestData, empNum: e.target.value })} placeholder="Emp Number" /> 
                    
                    <p><strong>Department:</strong></p>
                    <input className="form-control mb-2" value={editRequestData.department} onChange={(e) => setEditRequestData({ ...editRequestData, department: e.target.value })} placeholder="Department" />

                    <p><strong>Machine Code:</strong></p>
                    <input className="form-control mb-2" value={editRequestData.machine_code} onChange={(e) => setEditRequestData({ ...editRequestData, machine_code: e.target.value })} placeholder="Machine Code" />

                    <p><strong>Type:</strong></p>
                    <input className="form-control mb-2" value={editRequestData.type} onChange={(e) => setEditRequestData({ ...editRequestData, type: e.target.value })} placeholder="Type" />

                    <p><strong>Employee:</strong></p>
                    <input className="form-control mb-3" value={editRequestData.employee_name} onChange={(e) => setEditRequestData({ ...editRequestData, employee_name: e.target.value })} placeholder="Employee Name" />

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
      </div>
    </div>
  );
}

export default Notification;
