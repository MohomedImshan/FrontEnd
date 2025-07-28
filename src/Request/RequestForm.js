import axios from 'axios'
import {Modal , Button ,Form} from 'react-bootstrap'
import Header from '../Header/Header'
import { useState } from 'react';

function RequestForm() {
  const [formData, setFormData] = useState({
    department: '',
    machine_code: '',
    type: '',
    description: '',
    employee_name: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8800/requests/addRequest', formData);
    setFormData({ department: '', machine_code: '', type: '', description: '', employee_name: '' });
    window.dispatchEvent(new Event('request-submitted'));
  };

  return (
    <div>
        < Header/>
    <div className="border shadow bg-light rounded mx-auto my-4 p-2 w-50 h-auto" >
      <h2 className="mb-4">Request Form for get Spare Parts</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="col-form-label">Department</label>
          <input className="form-control" required
            value={formData.department}
            onChange={e => setFormData({ ...formData, department: e.target.value })} />
        </div>

        <div className="mb-3">
          <label>Machine Code</label>
          <input className="form-control " required
            value={formData.machine_code}
            onChange={e => setFormData({ ...formData, machine_code: e.target.value })} />
        </div>

        <div className="mb-3">
          <label>Type</label>
          <input className="form-control" required
            value={formData.type}
            onChange={e => setFormData({ ...formData, type: e.target.value })} />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea className="form-control" required
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })} />
        </div>

        <div className="mb-3">
          <label>Employee Name</label>
          <input className="form-control" required
            value={formData.employee_name}
            onChange={e => setFormData({ ...formData, employee_name: e.target.value })} />
        </div>

        <button type="submit" className="btn btn-sm btn-outline-primary mb-2">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default RequestForm;