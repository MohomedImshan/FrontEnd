import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SpareParts = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    department: '',
    type: '',
    item_name: '',
    quantity: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchSpareParts = async () => {
    try {
      const res = await axios.get('http://localhost:8801/api/spareparts');
      setSpareParts(res.data);
    } catch (err) {
      console.error('Error fetching spare parts:', err);
    }
  };

  useEffect(() => {
    fetchSpareParts();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8801/api/spareparts/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:8801/api/spareparts', formData);
      }
      fetchSpareParts();
      setFormData({ department: '', type: '', item_name: '', quantity: '' });
      setEditingId(null);
      setShowModal(false);
    } catch (err) {
      console.error('Error saving spare part:', err);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:8801/api/spareparts/${id}`);
      fetchSpareParts();
    } catch (err) {
      console.error('Error deleting spare part:', err);
    }
  };

  const handleEdit = part => {
    setFormData(part);
    setEditingId(part.id);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Spare Parts</h2>

      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setFormData({ department: '', type: '', item_name: '', quantity: '' });
          setEditingId(null);
          setShowModal(true);
        }}
      >
        Add Spare Part
      </button>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{editingId ? 'Update Spare Part' : 'Add Spare Part'}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowModal(false);
                      setFormData({ department: '', type: '', item_name: '', quantity: '' });
                      setEditingId(null);
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      name="department"
                      className="form-control"
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <input
                      type="text"
                      name="type"
                      className="form-control"
                      value={formData.type}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Item Name</label>
                    <input
                      type="text"
                      name="item_name"
                      className="form-control"
                      value={formData.item_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      className="form-control"
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    {editingId ? 'Update' : 'Save'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      setFormData({ department: '', type: '', item_name: '', quantity: '' });
                      setEditingId(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Department</th>
            <th>Type</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {spareParts.map(part => (
            <tr key={part.id}>
              <td>{part.id}</td>
              <td>{part.department}</td>
              <td>{part.type}</td>
              <td>{part.item_name}</td>
              <td>{part.quantity}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(part)}>
                  Update
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(part.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpareParts;
