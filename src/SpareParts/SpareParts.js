import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SpareParts.css';





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

    const handleEdit = (part) => {
        setFormData(part);
        setEditingId(part.id);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Spare Parts</h2>
             <button className="add-button" onClick={() => setShowModal(true)}>
    Add Spare Part
  </button>

  {showModal && (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Spare Part</h2>
        <form>
          <label>Department:</label>
             <input 
                name = "department" 
                value ={formData.department} 
                onChange = {handleChange} 
                type="text" 
                placeholder="Enter department" 
            />
          <label>Type:</label>
            <input
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Enter type"
            />

         <label>Item Name:</label>
             <input
                name="item_name"
                value={formData.item_name}
                onChange={handleChange}
                placeholder="Enter item name"
             />

          <label>Quantity:</label>
             <input 
                name ="quantity"
                type="number" 
                placeholder="Enter quantity"
                value = {formData.quantity}
             />

          {/* Add more fields if needed */}

          <div className="modal-buttons">
            <button type="submit">{editingId ? "Update" : "Save"}</button>
            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )}

            <form onSubmit={handleSubmit}>
                <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
                <input name="type" placeholder="Type" value={formData.type} onChange={handleChange} />
                <input name="item_name" placeholder="Item Name" value={formData.item_name} onChange={handleChange} />
                <input name="quantity" placeholder="Quantity" type="number" value={formData.quantity} onChange={handleChange} />
                <button type="submit">{editingId ? "Update" : "Add"} Spare Part</button>
            </form>

            <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
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
                            <button onClick={() => handleEdit(part)}>Update</button>
                            <button onClick={() => handleDelete(part.id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SpareParts;