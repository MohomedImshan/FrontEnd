import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header/Header";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Button, Form, Modal } from "react-bootstrap";

const SpareParts = () => {
  const [spareParts, setSpareParts] = useState([]); // All spare parts from backend
  const [filteredParts, setFilteredParts] = useState([]); // Parts after search filter
  const [searchTerm, setSearchTerm] = useState(""); // Search text
  

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    empNum:localStorage.getItem('empNum')||"",
    department: "",
    type: "",
    item_name: "",
    quantity: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [highlightQuantity, setHighlightQuantity] = useState(false);

  const [showDownloadModal,setShowDownloadModal] = useState(false)
  const [selectedDepartment,setSelectedDepartment]=useState('')
  const [stock,setStock] = useState([])

  // Fetch spare parts from backend
  const fetchSpareParts = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/spareparts");
      setSpareParts(res.data);
      setFilteredParts(res.data); // show all initially
    } catch (err) {
      console.error("Error fetching spare parts:", err);
    }
  };

  useEffect(() => {
    
    fetchSpareParts();
  }, []);

  // When typing in search bar, filter parts
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = spareParts.filter(
      (p) =>
        p.department.toLowerCase().includes(value) ||
        p.type.toLowerCase().includes(value) ||
        p.item_name.toLowerCase().includes(value)
    );
    setFilteredParts(filtered);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Prevent editing read-only fields in update mode
  const handleForbiddenEdit = () => {
    if (editingId) {
      setErrorMessage("Can't change this! Use Add Quantity.");
      setHighlightQuantity(true);
    }
  };

  //Save or update spare parts
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Find current part being edited
        const existingPart = spareParts.find((p) => p.id === editingId);
        const updatedQuantity =
          (parseInt(existingPart.quantity, 10) || 0) +
          (parseInt(formData.quantity, 10) || 0);

        await axios.put(`http://localhost:8800/api/spareparts/${editingId}`, {
          ...existingPart,
          quantity: updatedQuantity,
          empNum:localStorage.getItem('empNum'),
        });
      } else {
        // Prevent duplicate entry
        const exists = spareParts.some(
          (p) =>
            p.department.toLowerCase() === formData.department.toLowerCase() &&
            p.type.toLowerCase() === formData.type.toLowerCase() &&
            p.item_name.toLowerCase() === formData.item_name.toLowerCase()
        );

        if (exists) {
          setErrorMessage("Already exists! Use Update option.");
          return;
        }

        await axios.post("http://localhost:8800/api/spareparts", {...formData,
        empNum:localStorage.getItem('empNum'),});
      }

      fetchSpareParts(); // reload list
      setFormData({ empNum:localStorage.getItem('empNum'), department: "", type: "", item_name: "", quantity: "" });
      setEditingId(null);
      setShowModal(false);
      setErrorMessage("");
      setHighlightQuantity(false);
    } catch (err) {
      console.error("Error saving spare part:", err);
    }
  };

  // Delete part
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/spareparts/${id}`);
      fetchSpareParts();
    } catch (err) {
      console.error("Error deleting spare part:", err);
    }
  };

  // Edit part
  const handleEdit = (part) => {
    setFormData({ ...part, quantity: "" }); // reset quantity for adding new qty
    setEditingId(part.id);
    setShowModal(true);
    setErrorMessage("");
    setHighlightQuantity(false);
  };

  const handleshowDownload=()=>setShowDownloadModal(true);
  const handleDowloadClose = ()=>{
    setShowDownloadModal(false)
    setSelectedDepartment('')
  }

  const handleDownload= async ()=>{
    if(!selectedDepartment) return alert('Please Select a Department')

    const token = localStorage.getItem('token')
    if(!token) return alert('No token found')
    try{
      const res = await axios.get(
        `http://localhost:8800/api/spareparts/stock?department=${selectedDepartment}`,
        {headers:{Authorization:`Bearer ${token}`}}
      )
      
      const stockData = res.data.stock
      if(!stockData||stockData.length === 0) return alert("No stock found")

      
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text('Stock Report',20,20)
    doc.setFontSize(14)
    doc.text(`Department : ${selectedDepartment}`,20,35)
    doc.setFontSize(12)
    doc.text("Generated on: "+ new Date().toLocaleString(),20,45)

    
    const tableColumn = [
        "ID",
        "Department",
        "Type",
        "Item Name",
        "Quantity",
        
    ]
    const tableRows = stockData.map(r =>[
        r.id,
        r.department,
        r.type,
        r.item_name,
        r.quantity,
        
        
        
    ])
    doc.autoTable({
        head:[tableColumn],
        body:tableRows,
        startY:55,
        theme:"grid",
        headStyles:{fillColor:[46,204,113]}
    })
    doc.save(`Stock_Report_${selectedDepartment}.pdf`)
    }
    catch (err) {
      console.error(err);
      alert('Error fetching stock data');
    }
  }
  

  return (
    <div>
      <Header />

      <div className="container mt-4">
        <h2 className="mb-3">Spare Parts</h2>

        {/* Search bar */}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by Department, Type or Item Name..."
          value={searchTerm}
          onChange={handleSearch}
        />

        {/*Add button */}
        <button
          className="btn btn-sm btn-outline-success me-3"
          onClick={() => {
            setFormData({
              empNum:localStorage.getItem('empNum'),
              department: "",
              type: "",
              item_name: "",
              quantity: "",
            });
            setEditingId(null);
            setShowModal(true);
            setErrorMessage("");
            setHighlightQuantity(false);
          }}
        >
          Add Spare Part
        </button>
        <button
          className="btn btn-sm btn-outline-success me-3"  
          onClick={handleshowDownload}       
        >
          Download Stock Report
        </button>

        <Modal show={showDownloadModal} onHide={handleDowloadClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Select Department</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="departmentSelect">
                <Form.Select value={selectedDepartment} onChange={(e)=>setSelectedDepartment(e.target.value)}>
                  <option value="">--Select Department--</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Electrical">Electrical</option>
                  <option value="General">General</option>

                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success"onClick={handleDownload}>Download PDF</Button>
            <Button variant="secondary"onClick={handleDowloadClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        
        

        {/*Modal for add/update */}
        {showModal && (
          <div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {editingId ? "Update Spare Part" : "Add Spare Part"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => {
                        setShowModal(false);
                        setFormData({
                          empNum:"",
                          department: "",
                          type: "",
                          item_name: "",
                          quantity: "",
                        });
                        setEditingId(null);
                        setErrorMessage("");
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
                          value={
                            spareParts.find((p) => p.id === editingId)?.quantity ||
                            0
                          }
                          readOnly
                        />
                      </div>
                    )}

                    {/* Quantity */}
                    <div className="mb-3">
                      <label className="form-label">
                        {editingId ? "Add Quantity" : "Quantity"}
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        className={`form-control ${
                          highlightQuantity ? "border border-danger" : ""
                        }`}
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                      <div style={{ color: "red", fontSize: "0.85rem" }}>
                        {errorMessage}
                      </div>
                    )}
                  </div>

                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-sm btn-outline-success me-1"
                    >
                      {editingId ? "Update" : "Save"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger me-1"
                      onClick={() => {
                        setShowModal(false);
                        setFormData({
                          empNum: "",
                          department: "",
                          type: "",
                          item_name: "",
                          quantity: "",
                        });
                        setEditingId(null);
                        setErrorMessage("");
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

        {/*Spare parts table */}
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
            {filteredParts.length > 0 ? (
              filteredParts.map((part) => (
                <tr key={part.id}>
                  <td>{part.id}</td>
                  <td>{part.department}</td>
                  <td>{part.type}</td>
                  <td>{part.item_name}</td>
                  <td
                    style={{
                      color: part.quantity === 0 ? "red" : "black",
                      fontWeight: part.quantity === 0 ? "bold" : "normal",
                    }}
                  >
                    {part.quantity === 0 ? "Out of Stock" : part.quantity}
                  </td>
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
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                   No parts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpareParts;
