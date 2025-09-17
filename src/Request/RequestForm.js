
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header.js';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function RequestForm() {
  const [formData, setFormData] = useState({
    empNum: localStorage.getItem('empNum') || '',
    department: '',
    machine_code: '',
    type: '',
    description: '',
    parts: []
  });

  const [newPart, setNewPart] = useState({ id: '', item_name: '', quantity: '' });
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', variant: '' });
  const [suggestions,setSuggestions]=useState([])
  const [allParts,setAllParts]=useState([])

  useEffect(()=>{
    axios.get('http://localhost:8800/api/spareParts')
    .then(res=>setAllParts(res.data))
    .catch(err=>console.error(err))
  },[])
  const handleItemNameChange=(value)=>{
    setNewPart({...newPart,item_name:value,id:''})
    if(value.length>0){
      const matches = allParts.filter(p=>
        p.item_name.toLowerCase().includes(value.toLowerCase())  
        )
        setSuggestions(matches)
    }else{
      setSuggestions([])
    }
  }
  const handleSelectSuggestions = (part)=>{
    setNewPart({id:part.id,item_name:part.item_name,quantity:newPart.quantity})
    setSuggestions([])
  }

  const handleQuantityChange=(q)=>setNewPart({...newPart,quantity:q})
  // Add part to formData.parts
  const handleAddPart = () => {
    if (!newPart.id || !newPart.item_name || !newPart.quantity) return;

    setFormData(prev => ({
      ...prev,
      parts: [...prev.parts, newPart]
    }));

    setNewPart({ id: '', item_name: '', quantity: '' });
    setShowModal(false);
  };

  // Submit request with all parts
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const userName = localStorage.getItem('userName') /*|| 'Unknown User'*/;
      const response = await axios.post(`http://localhost:8800/api/requests/addRequest`, {

        ...formData,
        userName
      });

      setNotification({ show: true, message: 'Request submitted successfully!', variant: 'success' });

      // Reset form
      setFormData({ empNum: formData.empNum, department: '', machine_code: '', type: '', description: '', parts: [] });
    } catch (err) {
      console.error(err);
      setNotification({ show: true, message: 'Failed to submit request!', variant: 'danger' });
    }
  };

  return (
    <div>
      <Header />
      <div className="border shadow bg-light rounded mx-auto my-4 p-4" style={{ maxWidth: 720 }}>
        <h2>Request Form for Spare Parts</h2>

        {notification.show && <div className={`alert alert-${notification.variant} mt-2`}>{notification.message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Employee Number</label>
            <input type="text" className="form-control" value={formData.empNum} readOnly />
          </div>

          <div className="mb-3">
            <label>Department</label>
            <select className="form-control" 
              value={formData.department}
              onChange={e => setFormData({ ...formData, department: e.target.value })} required >
              <option value="">-- Select Department --</option>
              <option value="Electrical">Electrical</option>
              <option value="Mechanical">Mechanical</option>
              <option value="General">General</option>
          </select>

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


          {/* List of added parts */}
          {formData.parts.map((part, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <input type="text" className="form-control" value={part.id} readOnly />
              <input type="text" className="form-control" value={part.item_name} readOnly />
              <input type="number" className="form-control" value={part.quantity} readOnly />
            </div>
          ))}

          <button type="button" className="btn btn-outline-success mb-2" onClick={() => setShowModal(true)}>+ Add Spare Part</button>
          <br />
          <button type="submit" className="btn btn-outline-primary mb-2">Submit Request</button>

        </form>
      </div>

      {/* Modal for adding parts */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Spare Part</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form.Group className="mb-2">
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" value={newPart.item_name} onChange={e => handleItemNameChange(e.target.value )} />
            {suggestions.length>0 &&(
              <ul className='list-group mt-1'>
                {suggestions.map((s,i)=>(
                  <li key={i} className='list-group-item list-group-item-action' style={{cursor:'pointer'}}
                  onClick={()=>handleSelectSuggestions(s)}>
                    {s.item_name}(ID:{s.id})
                  </li>
                ))}
              </ul>
            )}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" value={newPart.quantity} onChange={e => handleQuantityChange(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleAddPart}>Add Part</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RequestForm;
