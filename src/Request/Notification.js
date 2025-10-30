import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import Header from '../Header/Header';

const API = 'http://localhost:8800/api';

function Notification() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedParts, setSelectedParts] = useState([]);


  const [stockError,setStockError]=useState(null)


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


  const updateStatus = async (id, status) => {
    console.log(id,"to status",status)
    try {

      await axios.put(`${API}/requests/status/${id}`, { status });

      fetchRequests();
    } catch (err) {
      //console.error('Status update failed', err);
      if(err.response?.status === 400 && err.response?.data?.message?.includes('Not enough stock')){
        setStockError(err.response.data.message)
      }else{
        alert(`Status update failed:`);
   
      }
      
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
                <th>Date Of Action</th>
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
                  <td>{req.userName}</td>
                  <td>{req.created_at ? new Date(req.created_at).toLocaleString() : '-'}</td>
                  <td>{req.approved_date ? new Date(req.approved_date).toLocaleString() : '-'}</td>
                  <td>
                    <button onClick={() => openModal(req)} className="btn btn-sm btn-outline-info">View</button>
                  </td>
                  <td className="text-nowrap">
                   {req.status} 
                  </td>
                  <td className="text-nowrap">
                    <button onClick={() => updateStatus(req.id, 'Approved')} className="btn btn-sm btn-outline-success me-1">Approve</button>
                    <button onClick={() => updateStatus(req.id, 'Rejected')} className="btn btn-sm btn-outline-danger">Reject</button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr><td colSpan="12" className="text-center py-4">No requests found</td></tr>
              )}
            </tbody>
          </table>
        </div>

          {stockError &&(
            <div className='modal show d-block' tabIndex="-1" role='dialog'>
              <div className="modal-dialog">
              <div className="modal-content p-3">
                <div className="modal-header">
                  <h5 className="modal-title text-danger">Stock Error</h5>
                  <button type="button" className="btn-close" onClick={() => setStockError(null)}></button>
                </div>
                <div className="modal-body">
                  <p>{stockError}</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setStockError(null)}>Close</button>
                </div>
              </div>
            </div>
            </div>
          )}
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


      </div>
    </div>
  );
}

export default Notification;
