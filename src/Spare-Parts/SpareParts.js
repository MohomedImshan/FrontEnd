import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';

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
  const [errorMessage, setErrorMessage] = useState('');
  const [highlightQuantity, setHighlightQuantity] = useState(false);

  const fetchSpareParts = async () => {
    try {
      const res = await axios.get('http://localhost:8800/api/spareparts');
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

  // 🔹 Trigger error if user tries to edit read-only fields in update mode
  const handleForbiddenEdit = () => {
    if (editingId) {
      setErrorMessage("Can't change this! Use Add Quantity.");
      setHighlightQuantity(true);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        const existingPart = spareParts.find(p => p.id === editingId);
        const updatedQuantity =
          (parseInt(existingPart.quantity, 10) || 0) +
          (parseInt(formData.quantity, 10) || 0);

        await axios.put(`http://localhost:8800/api/spareparts/${editingId}`, {
          ...existingPart,
          quantity: updatedQuantity
        });
      } else {
        const exists = spareParts.some(
          p =>
            p.department.toLowerCase() === formData.department.toLowerCase() &&
            p.type.toLowerCase() === formData.type.toLowerCase() &&
            p.item_name.toLowerCase() === formData.item_name.toLowerCase()
        );

        if (exists) {
          setErrorMessage('Already exists! Use Update option.');
          return;
        }

        await axios.post('http://localhost:8800/api/spareparts', formData);
      }

      fetchSpareParts();
      setFormData({ department: '', type: '', item_name: '', quantity: '' });
      setEditingId(null);
      setShowModal(false);
      setErrorMessage('');
      setHighlightQuantity(false);
    } catch (err) {
      console.error('Error saving spare part:', err);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:8800/api/spareparts/${id}`);
      fetchSpareParts();
    } catch (err) {
      console.error('Error deleting spare part:', err);
    }
  };

  const handleEdit = part => {
    setFormData({ ...part, quantity: '' }); // reset quantity for adding new qty
    setEditingId(part.id);
    setShowModal(true);
    setErrorMessage('');
    setHighlightQuantity(false);
  };

  return (
    <div>
       <Header />

    <div className="container mt-4">
     
      <h2 className="mb-4">Spare Parts</h2>

      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setFormData({ department: '', type: '', item_name: '', quantity: '' });
          setEditingId(null);
          setShowModal(true);
          setErrorMessage('');
          setHighlightQuantity(false);
        }}
      >
        Add Spare Part
      </button>

      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingId ? 'Update Spare Part' : 'Add Spare Part'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowModal(false);
                      setFormData({ department: '', type: '', item_name: '', quantity: '' });
                      setEditingId(null);
                      setErrorMessage('');
                      setHighlightQuantity(false);
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  {/* Department */}
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    {editingId ? (
                      <input
                        type="text"
                        className="form-control"
                        value={formData.department}
                        readOnly
                        onFocus={handleForbiddenEdit}
                      />
                    ) : (
                      <select
                        name="department"
                        className="form-select"
                        value={formData.department}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- Select Department --</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Electrical">Electrical</option>
                        <option value="General">General</option>
                        <option value="Other">Other</option>
                      </select>
                    )}
                  </div>

                  {/* Type */}
                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <input
                      type="text"
                      name="type"
                      className="form-control"
                      value={formData.type}
                      onChange={handleChange}
                      readOnly={!!editingId}
                      onFocus={handleForbiddenEdit}
                    />
                  </div>

                  {/* Item Name */}
                  <div className="mb-3">
                    <label className="form-label">Item Name</label>
                    <input
                      type="text"
                      name="item_name"
                      className="form-control"
                      value={formData.item_name}
                      onChange={handleChange}
                      readOnly={!!editingId}
                      onFocus={handleForbiddenEdit}
                    />
                  </div>

                  {/* Current Quantity */}
                  {editingId && (
                    <div className="mb-3">
                      <label className="form-label">Current Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        value={spareParts.find(p => p.id === editingId)?.quantity || 0}
                        readOnly
                      />
                    </div>
                  )}

                  {/* Quantity */}
                  <div className="mb-3">
                    <label className="form-label">
                      {editingId ? 'Add Quantity' : 'Quantity'}
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      className={`form-control ${highlightQuantity ? 'border border-danger' : ''}`}
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <div style={{ color: 'red', fontSize: '0.85rem' }}>{errorMessage}</div>
                  )}
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-sm btn-outline-success me-1">
                    {editingId ? 'Update' : 'Save'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger me-1"
                    onClick={() => {
                      setShowModal(false);
                      setFormData({ department: '', type: '', item_name: '', quantity: '' });
                      setEditingId(null);
                      setErrorMessage('');
                      setHighlightQuantity(false);
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
        <thead>
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
                <button
                  className="btn btn-sm btn-outline-success me-1"
                  onClick={() => handleEdit(part)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-outline-danger me-1"
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
    </div>
  );
};

export default SpareParts;
