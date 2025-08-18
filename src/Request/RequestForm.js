import React, { useState } from 'react';
import Header from '../Header/Header.js';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';


function RequestForm() {
  const [formData, setFormData] = useState({
    empNum: localStorage.getItem('empNum') || '',
    department: '',
    machine_code: '',
    type: '',
    description: ''
  });

  const [showPartsModal, setShowPartsModal] = useState(false);
  const [partsData, setPartsData] = useState({ partName: '', count: '' });
  const [notification, setNotification] = useState({ show: false, message: '', variant: '' });
  const [lastRequestId, setLastRequestId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const userName = localStorage.getItem('userName') || 'Unknown User';
      const response = await axios.post(`http://localhost:8800/api/requests/addRequest`, {
        ...formData,
        userName
      });
      const newId = response.data.result.insertId;
      setLastRequestId(newId);
      console.log("New Request ID:", newId);
      setNotification({ show: true, message: 'Request submitted successfully!', variant: 'success' });
      setShowPartsModal(true);
      setFormData({ ...formData, department: '', machine_code: '', type: '', description: '' });

      // let the notifications page auto-refresh if it's open
      window.dispatchEvent(new Event('request-submitted'));
    } catch (error) {
      console.error(error.response?.data || error.message);
      setNotification({
        show: true,
        message: error.response?.details || 'Failed to submit request!',
        variant: 'danger'
      });
    }
  };

  const handleAddParts = async () => {
    try {
      if (!lastRequestId) throw new Error('Request ID not found');
      await axios.post(`http://localhost:8800/api/requests/addParts`, {
        requestId: lastRequestId,
        partName: partsData.partName,
        count: partsData.count
      });
      setNotification({ show: true, message: 'Spare part added successfully!', variant: 'success' });
      setShowPartsModal(false);
      setPartsData({ partName: '', count: '' });
    } catch (error) {
      console.error(error.response?.data || error.message);
      setNotification({ show: true, message: 'Failed to add spare part!', variant: 'danger' });
    }
  };

  return (
    <div>
      <Header />
      <div className="border shadow bg-light rounded mx-auto my-4 p-4" style={{maxWidth: 720}}>
        <h2>Request Form for Spare Parts</h2>

        {notification.show && (
          <div className={`alert alert-${notification.variant} mt-2`}>{notification.message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Employee Number</label>
            <input type="text" className="form-control" value={formData.empNum} readOnly />
          </div>

          <div className="mb-3">
            <label>Department</label>
            <input type="text" className="form-control" value={formData.department}
              onChange={e => setFormData({ ...formData, department: e.target.value })} required />
          </div>

          <div className="mb-3">
            <label>Machine Code</label>
            <input type="text" className="form-control" value={formData.machine_code}
              onChange={e => setFormData({ ...formData, machine_code: e.target.value })} required />
          </div>

          <div className="mb-3">
            <label>Type</label>
            <input type="text" className="form-control" value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })} required />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea className="form-control" value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })} required />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      {/* Spare Parts Modal */}
      <Modal show={showPartsModal} onHide={() => setShowPartsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Spare Parts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Part Name</Form.Label>
              <Form.Control type="text" value={partsData.partName}
                onChange={e => setPartsData({ ...partsData, partName: e.target.value })}
                placeholder="Enter part name" />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Count</Form.Label>
              <Form.Control type="number" value={partsData.count}
                onChange={e => setPartsData({ ...partsData, count: e.target.value })}
                placeholder="Enter quantity" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPartsModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddParts}>Add Part</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RequestForm;
