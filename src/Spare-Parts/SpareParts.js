

import React, { useEffect, useState } from "react"; 
import axios from "axios"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import Header from "../Header/Header"; 
import jsPDF from "jspdf"; 
import "jspdf-autotable"; 
import { Button, Form, Modal } from "react-bootstrap"; 


const SpareParts = () => {
  
  const [spareParts, setSpareParts] = useState([]); 
  const [filteredParts, setFilteredParts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 

  const [showModal, setShowModal] = useState(false); 
  const [editingId, setEditingId] = useState(null); 

  const [formData, setFormData] = useState({
    empNum: localStorage.getItem("empNum") || "",
    department: "",
    supplier: "No supplier",
    type: "",
    item_name: "",
    quantity: "", 
    cost: "0.00",
  });

  const [errorMessage, setErrorMessage] = useState(""); 
  const [highlightQuantity, setHighlightQuantity] = useState(false); 

  const [showDownloadModal, setShowDownloadModal] = useState(false); 
  const [selectedDepartment, setSelectedDepartment] = useState(""); 
  const [stock, setStock] = useState([]); 

  const API = process.env.REACT_APP_API_URL || "http://localhost:8800";

  
  const fetchSpareParts = async () => {
    try {
      const res = await axios.get(`${API}/api/spareparts`);
      setSpareParts(res.data); 
      setFilteredParts(res.data); 
    } catch (err) {
      console.error("Error fetching spare parts:", err);
    }
  };

  
  useEffect(() => {
    fetchSpareParts();
    
  }, []);

 
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = spareParts.filter((p) =>
      [
        p.department,
        p.type,
        p.item_name,
        p.supplier, 
      ]
        .map((v) => (v || "").toString().toLowerCase())
        .some((text) => text.includes(value))
    );
    setFilteredParts(filtered);
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleForbiddenEdit = () => {
    if (editingId) {
      setErrorMessage("Can't change this! Use Add Quantity.");
      setHighlightQuantity(true); 
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        
        const existingPart = spareParts.find((p) => p.id === editingId);
        const addQty = parseInt(formData.quantity, 10) || 0;
        const updatedQuantity =
          (parseInt(existingPart.quantity, 10) || 0) + addQty;

        
        const updatedCost =
          (parseFloat(existingPart.cost) || 0) +
          (parseFloat(formData.cost) || 0);

        const payload = {
          ...existingPart,
          quantity: updatedQuantity,
          cost: updatedCost,
          empNum: localStorage.getItem("empNum") || formData.empNum,
        };

        await axios.put(`${API}/api/spareparts/${editingId}`, payload);
      } else {
       
        if (!formData.department || !formData.type || !formData.item_name) {
          setErrorMessage("Department, Type and Item Name are required.");
          return;
        }

        const postPayload = {
          ...formData,
          empNum: localStorage.getItem("empNum") || formData.empNum,
          cost: parseFloat(formData.cost) || 0.0,
          quantity: parseInt(formData.quantity, 10) || 0,
        };

        await axios.post(`${API}/api/spareparts`, postPayload);
      }

      
      await fetchSpareParts();
      setFormData({
        empNum: localStorage.getItem("empNum") || "",
        department: "",
        supplier: "No supplier",
        type: "",
        item_name: "",
        quantity: "",
        cost: "0.00",
      });
      setEditingId(null);
      setShowModal(false);
      setErrorMessage("");
      setHighlightQuantity(false);
    } catch (err) {
      console.error("Error saving spare part:", err);
      setErrorMessage("Server error while saving. Check console.");
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/spareparts/${id}`);
      await fetchSpareParts();
    } catch (err) {
      console.error("Error deleting spare part:", err);
    }
  };

  
  const handleEdit = (part) => {
    setFormData({
      empNum: localStorage.getItem("empNum") || "",
      department: part.department || "",
      supplier: part.supplier || "No supplier",
      type: part.type || "",
      item_name: part.item_name || "",
      quantity: "", 
      cost:
        part.cost !== undefined && part.cost !== null
          ? String(Number(part.cost).toFixed(2))
          : "0.00",
    });
    setEditingId(part.id);
    setShowModal(true);
    setErrorMessage("");
    setHighlightQuantity(false);
  };

 
  const handleshowDownload = () => setShowDownloadModal(true);
  const handleDowloadClose = () => {
    setShowDownloadModal(false);
    setSelectedDepartment("");
  };

  const handleDownload = async () => {
    if (!selectedDepartment) return alert("Please Select a Department");

    const token = localStorage.getItem("token");
    if (!token) return alert("No token found");

    try {
      const res = await axios.get(
        `${API}/api/spareparts/stock?department=${selectedDepartment}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const stockData = res.data.stock;
      if (!stockData || stockData.length === 0) return alert("No stock found");

      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Stock Report", 20, 20);
      doc.setFontSize(14);
      doc.text(`Department : ${selectedDepartment}`, 20, 35);
      doc.setFontSize(12);
      doc.text("Generated on: " + new Date().toLocaleString(), 20, 45);

      const tableColumn = [
        "ID",
        "Department",
        "Supplier",
        "Type",
        "Item Name",
        "Quantity",
        "Cost",
      ];
      const tableRows = stockData.map((r) => [
        r.id,
        r.department,
        r.supplier,
        r.type,
        r.item_name,
        r.quantity,
        Number(r.cost || 0).toFixed(2),
      ]);

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 55,
        theme: "grid",
        headStyles: { fillColor: [46, 204, 113] },
      });
      doc.save(`Stock_Report_${selectedDepartment}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Error fetching stock data");
    }
  };

  
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Main container */}
      <div className="container mt-4">
        <h1 className="mb-3 topic">Spare Parts</h1>

        {/* Search bar */}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by Department, Type, Item Name or Supplier..."
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Buttons */}
        <button
          className="btn btn-sm btn-danger me-3"
          onClick={() => {
            setFormData({
              empNum: localStorage.getItem("empNum") || "",
              department: "",
              supplier: "No supplier",
              type: "",
              item_name: "",
              quantity: "",
              cost: "0.00",
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

          className="btn btn-sm btn-danger me-3"  
          onClick={handleshowDownload}       
        >
          Download Stock Report
        </button>
<br></br>
<br></br>

        <Modal show={showDownloadModal} onHide={handleDowloadClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Select Department</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="departmentSelect">
                <Form.Select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">--Select Department--</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Electrical">Electrical</option>
                  <option value="General">General</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleDownload}>
              Download PDF
            </Button>
            <Button variant="secondary" onClick={handleDowloadClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add/Update Modal */}
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
                      onClick={() => setShowModal(false)}
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

                    {/* Supplier */}
                    <div className="mb-3">
                      <label className="form-label">Supplier</label>
                      <input
                        type="text"
                        name="supplier"
                        className="form-control"
                        value={formData.supplier}
                        onChange={handleChange}
                        required={!editingId}
                        readOnly={!!editingId}
                        onFocus={handleForbiddenEdit}
                      />
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
                        required
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
                        required
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
                            spareParts.find((p) => p.id === editingId)
                              ?.quantity || 0
                          }
                          readOnly
                        />
                      </div>
                    )}

                    {/* Quantity to Add */}
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

                    {/* Cost */}
                    <div className="mb-3">
                      <label className="form-label">Cost</label>
                      <input
                        type="number"
                        step="0.01"
                        name="cost"
                        className="form-control"
                        value={formData.cost}
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
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Spare Parts Table */}
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Department</th>
              <th>Supplier</th>
              <th>Type</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredParts.length > 0 ? (
              filteredParts.map((part) => (
                <tr key={part.id}>
                  <td>{part.id}</td>
                  <td>{part.department}</td>
                  <td>{part.supplier || "No supplier"}</td>
                  <td>{part.type}</td>
                  <td>{part.item_name}</td>
                  <td
                    style={{
                      color: Number(part.quantity) === 0 ? "red" : "black",
                      fontWeight:
                        Number(part.quantity) === 0 ? "bold" : "normal",
                    }}
                  >
                    {Number(part.quantity) === 0
                      ? "Out of Stock"
                      : part.quantity}
                  </td>
                  <td>{Number(part.cost || 0).toFixed(2)}</td>
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
                <td colSpan="8" style={{ textAlign: "center" }}>
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
