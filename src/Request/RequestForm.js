// import React, { useState } from 'react';
// import Header from '../Header/Header.js';
// import axios from 'axios';
// import { Modal, Button, Form } from 'react-bootstrap';


// function RequestForm() {
//   const [formData, setFormData] = useState({
//     empNum: localStorage.getItem('empNum') || '',
//     department: '',
//     machine_code: '',
//     type: '',
//     description: '',
//     parts:[]
//   });

//   const [newItem,setNewItem]= useState('')
//   const [newQuantity,setNewQuantity]= useState('')
//   const [newId,setNewId]= useState('')
//   const [showModal, setShowModal] = useState(false);
//   const [partsData, setPartsData] = useState({ partName: '', count: '' });
//   const [notification, setNotification] = useState({ show: false, message: '', variant: '' });
//   const [lastRequestId, setLastRequestId] = useState(null);
//   const [newPart,setNewPart]=useState({id:"",item_name:"",quantity:""})

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {

//       const userName = localStorage.getItem('userName') || 'Unknown User';
//       const response = await axios.post(`http://localhost:8800/api/requests/addRequest`, {
//         ...formData,
//         userName
//       });
//       const newId = response.data.result.insertId;
//       setLastRequestId(newId);
//       console.log("New Request ID:", newId);
//       setNotification({ show: true, message: 'Request submitted successfully!', variant: 'success' });
//       // setShowPartsModal(true);
//       setFormData({ ...formData, department: '', machine_code: '', type: '', description: '' ,parts:[]});

//       // let the notifications page auto-refresh if it's open
//       window.dispatchEvent(new Event('request-submitted'));
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       setNotification({
//         show: true,
//         message: error.response?.details || 'Failed to submit request!',
//         variant: 'danger'
//       });
//     }
//   };

//   // const handleAddParts = async () => {
//   //   try {
//   //     if (!lastRequestId) throw new Error('Request ID not found');
//   //     await axios.post(`http://localhost:8800/api/requests/addParts`, {
//   //       requestId: lastRequestId,
//   //       partName: partsData.partName,
//   //       count: partsData.count
//   //     });
//   //     setNotification({ show: true, message: 'Spare part added successfully!', variant: 'success' });
//   //     setShowPartsModal(false);
//   //     setPartsData({ partName: '', count: '' });
//   //   } catch (error) {
//   //     console.error(error.response?.data || error.message);
//   //     setNotification({ show: true, message: 'Failed to add spare part!', variant: 'danger' });
//   //   }
//   // };

//   const handleInput = (event) =>{
//     setValues(prev=>({...prev,[event.target.name]:event.target.value}))
// }
// const handleInputChange = (index,value)=>{
//     const updatedItems = [...items]
//     updatedItems[index] = value
//     setItems(updatedItems)
// }

// const handleAddItem = ()=>{
//     if(newId.trim() && newItem.trim() && newQuantity.trim()){
//         setItems([...items,{id:newId,name:newItem,quantity:newQuantity}])
//         setNewId('')
//         setNewItem('')
//         setNewQuantity('')
//         setShowModal(false)
//     }
// }
//   const handleAddParts = () =>{
//     if(!newPart.id || !newPart.item_name || !newPart.quantity){
//       return
//     }
//     setFormData({
//       ...formData,
//       parts:[...formData.parts,newPart]
//     })
//     setNewPart({id:'',item_name:'',quantity:''})
//     setShowModal(false)
//   }

//   return (
//     <div>
//       <Header />
//       <div className="border shadow bg-light rounded mx-auto my-4 p-4" style={{maxWidth: 720}}>
//         <h2>Request Form for Spare Parts</h2>

//         {notification.show && (
//           <div className={`alert alert-${notification.variant} mt-2`}>{notification.message}</div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label>Employee Number</label>
//             <input type="text" className="form-control" value={formData.empNum} readOnly />
//           </div>

//           <div className="mb-3">
//             <label>Department</label>
//             <input type="text" className="form-control" value={formData.department}
//               onChange={e => setFormData({ ...formData, department: e.target.value })} required />
//           </div>

//           <div className="mb-3">
//             <label>Machine Code</label>
//             <input type="text" className="form-control" value={formData.machine_code}
//               onChange={e => setFormData({ ...formData, machine_code: e.target.value })} required />
//           </div>

//           <div className="mb-3">
//             <label>Type</label>
//             <input type="text" className="form-control" value={formData.type}
//               onChange={e => setFormData({ ...formData, type: e.target.value })} required />
//           </div>

//           <div className="mb-3">
//             <label>Description</label>
//             <textarea className="form-control" value={formData.description}
//               onChange={e => setFormData({ ...formData, description: e.target.value })} required />
//           </div>

//           <button type="submit" className="btn btn-primary">Add parts</button>
      

//       {items.map((item,index)=>(
//                                  <div key={index} className="form-group d-flex align-items-center">
//                                  <label className='w-50'>Spare Part {index+1} :</label>
//                                  <input type="text" className="form-control w-75" 
//                                   id={`item-${index}`}
//                                   value={item.id}
//                                   onChange={(e)=>handleInputChange(index,"id",e.target.value)}
//                                   required />
//                                  <input type="text" className="form-control w-75" 
//                                   id={`item-${index}`}
//                                   value={item.name}
//                                   onChange={(e)=>handleInputChange(index,"item_name",e.target.value)}
//                                   required />
//                                 <input type="number" className="form-control w-25" 
//                                   id={`item-${index}`}
//                                   value={item.quantity}
//                                   onChange={(e)=>handleInputChange(index,"quantity",e.target.value)}
//                                   required />
//                                 </div>
//                             ))}
//                             <button className="btn btn-success my-2" 
//                             onClick={()=>setShowModal(true)}
//                             >+Add Spare Parts</button>
                           
                                
//                             <Modal show={showModal} onHide={()=>setShowModal(false)}>
//                                 <Modal.Header closeButton>
//                                     <Modal.Title>Add Spare Part</Modal.Title>
//                                 </Modal.Header>
//                                 <Modal.Body>
//                                     <Form.Group>
//                                     <Form.Label>Spare Parts Name</Form.Label>
//                                         <Form.Control type='text'
//                                         placeholder="Enter the parts id"
//                                         value={newId}
//                                         onChange={(e)=>setNewId(e.target.value)}
//                                         />
//                                         <Form.Label>Spare Parts Name</Form.Label>
//                                         <Form.Control type='text'
//                                         placeholder="Enter the parts name"
//                                         value={newItem}
//                                         onChange={(e)=>setNewItem(e.target.value)}
//                                         />
//                                          <Form.Control type='number'
//                                         placeholder="Add quantity"
//                                         value={newQuantity}
//                                         onChange={(e)=>setNewQuantity(e.target.value)}
//                                         />
//                                     </Form.Group>
//                                 </Modal.Body>
//                                 <Modal.Footer>
//                                     <Button variant="secondary" onClick={()=>setShowModal(false)}>
//                                         Cancel
//                                     </Button>
//                                     <Button variant="success" onClick={handleAddItem}>
//                                         Add Spare Part
//                                     </Button>
//                                 </Modal.Footer>
//                             </Modal>
//                       <br />
//                         <button type="submit" className="btn btn-primary">Send Request</button>
//                         </form>
//       </div>
//       {/* Spare Parts Modal */}
//       {/* <Modal show={showPartsModal} onHide={() => setShowPartsModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Spare Parts</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
          
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>ID</Form.Label>
//               <Form.Control type="text" value={partsData.id}
//                 onChange={e => setPartsData({ ...partsData, id: e.target.value })}
//                 placeholder="Enter ID" />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Item Name</Form.Label>
//               <Form.Control type="text" value={partsData.item_name}
//                 onChange={e => setPartsData({ ...partsData, item_name: e.target.value })}
//                 placeholder="Enter part name" />
//             </Form.Group>


//             <Form.Group className="mb-3">
//               <Form.Label>Quantity</Form.Label>
//               <Form.Control type="number" value={partsData.quantity}
//                 onChange={e => setPartsData({ ...partsData, quantity: e.target.value })}
//                 placeholder="Enter quantity" />
//             </Form.Group>


//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowPartsModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleAddParts}>Add Part</Button>
//           <Button variant="primary" onClick={handleSubmit}>Finish</Button>
          
//         </Modal.Footer>
//       </Modal> */}
//     </div>
//   );
// }

// export default RequestForm;
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
    description: '',
    parts: []
  });

  const [newPart, setNewPart] = useState({ id: '', item_name: '', quantity: '' });
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', variant: '' });

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
      const userName = localStorage.getItem('userName') || 'Unknown User';

      const response = await axios.post('http://localhost:8800/api/requests/addRequest', {
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

          {/* List of added parts */}
          {formData.parts.map((part, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <input type="text" className="form-control" value={part.id} readOnly />
              <input type="text" className="form-control" value={part.item_name} readOnly />
              <input type="number" className="form-control" value={part.quantity} readOnly />
            </div>
          ))}

          <button type="button" className="btn btn-success mb-2" onClick={() => setShowModal(true)}>+ Add Spare Part</button>
          <br />
          <button type="submit" className="btn btn-primary">Submit Request</button>
        </form>
      </div>

      {/* Modal for adding parts */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Spare Part</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" value={newPart.id} onChange={e => setNewPart({ ...newPart, id: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" value={newPart.item_name} onChange={e => setNewPart({ ...newPart, item_name: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" value={newPart.quantity} onChange={e => setNewPart({ ...newPart, quantity: e.target.value })} />
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
