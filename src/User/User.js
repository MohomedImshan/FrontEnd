    import React, { useEffect, useState } from 'react'
    import axios from "axios"
    import Header from '../Header/Header'
    import api from '../api/api'
    //import {  Link } from 'react-router-dom'
    import { Form,Button, Modal } from 'react-bootstrap'
import { jwtDecode } from 'jwt-decode'

    function User() {
        const [users, setUsers] = useState([])
        const [loggedInUser,setLoggedInUser] = useState(null)
        const [showModal,setShowModal] = useState(false) 
        const [showDeleteModal,setShowDeleteModal] = useState(null)
        const [selectedUser,setSelectedUser] = useState(null)
        const [editStatus,setEditStatus] = useState('')
        const [showRegisterModal,setShowRegisterModal] = useState(false)
        const [searchTerm,setSearchTerm] = useState('')
        
        const [newPassword, setNewPassword] = useState("");
        const [newUserName, setNewUserName] = useState("");
        const [newEmail, setNewEmail] = useState("");
        const [newPosition, setNewPosition] = useState("");

        const [editName,setEditName] = useState('')
        const [editEmail,setEditEmail] = useState('')
        const [editPosition,setEditPosition] = useState('')

        const filteredRequests = users.filter(req=>
            Object.values(req).some(val=>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())))

        const fetchAllUsers = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await api.get('/User',{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setUsers(res.data.users)
            } catch (err) {
                console.log(err)
                
            }
        }
        useEffect(() => {
            const token = localStorage.getItem('token')
            if(token){
                const decoded = jwtDecode(token)
                setLoggedInUser(decoded)
            }
            try{
                fetchAllUsers()
            }catch(err){
                if(err.response?.status === 403){
                    alert("Your account has been disabled or deleted.Please contact admin")
                    localStorage.removeItem('token')
                    window.location.href = '/'
                }
            }
            
        }, [])

        const handleRegisterSubmit = async () =>{
            try{
                const token = localStorage.getItem('token')
                await axios.post("http://localhost:8800/User",{
                    
                    userName:newUserName,
                    email:newEmail,
                    password:newPassword,
                    position:newPosition

                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                await fetchAllUsers()
                setShowRegisterModal(false)
                setNewUserName("")
                setNewEmail("")
                setNewPassword("")

            }catch(err){
                console.error("Failed to register User",err)
            }
        }
        const handleDeleteClick = (user)=>{
            setSelectedUser(user)
            setShowDeleteModal(true)
        }
        const handleEditClick = (user)=>{
            setSelectedUser(user)
            setEditName(user.userName || '')
            setEditEmail(user.email || '')
            setEditPosition(user.position || '')
            setEditStatus(user.status ||'' )

            setShowModal(true)
        }
        const handleAccept = async()=>{
            if(!selectedUser) return;

            try{
                const token = localStorage.getItem('token')
                await axios.put(`http://localhost:8800/User/${selectedUser.empNum}`,{
                    userName:editName,
                    email:editEmail,
                    position:editPosition,
                    status:editStatus,


                }
                ,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setUsers(prev=>
                    prev.map(u=>
                        u.empNum===selectedUser.empNum ? {...u,status:editStatus}:u
                        )
                        )
                setShowModal(false)
                setSelectedUser(null)
                await fetchAllUsers()
            }catch(err){
                console.error("Failed to update user status",err)
            }

            
        }
        const handleDeleteConfirm = async () => {
            if(!selectedUser) return

            try{
                const token = localStorage.getItem('token')
                await axios.delete(`http://localhost:8800/User/${selectedUser.empNum}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                
                setShowDeleteModal(false)
                setSelectedUser(null)
                await fetchAllUsers()
                
            }catch(err){
                console.error("Failed to delete user",err)
            }
        }
        return (
            <div>
                <Header />
                <div className='container mt-4'><br />
                <h1>User Details</h1>
                

              
                    <button className='btn btn-sm btn-outline-success me-1' onClick={()=>setShowRegisterModal(true)}>Register New Employee</button>  <br />
                
                
                                            <Modal show={showRegisterModal} onHide={()=>setShowRegisterModal(false)}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Register</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                <Form.Group className='mb-2'>
                                                    <Form.Label>User Name</Form.Label>
                                                    <Form.Control type='text' value={newUserName} onChange={(e)=>setNewUserName(e.target.value)}></Form.Control>
                                                </Form.Group>
                                                <Form.Group className='mb-2'>
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type='email' value={newEmail} onChange={(e)=>setNewEmail(e.target.value)}></Form.Control>
                                                </Form.Group>
                                                <Form.Group className='mb-2'>
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type='password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}></Form.Control>
                                                </Form.Group>
                                                <Form.Group className='mb-2'>
                                                    <Form.Label>Position</Form.Label>
                                                    {/* <Form.Control type='text' value={newPosition} onChange={(e)=>setNewPosition(e.target.value)}></Form.Control> */}
                                                    <Form.Select
                                                            value={newPosition}
                                                            onChange={(e) => setNewPosition(e.target.value)}
                                                        >
                                                            <option value="">Select status</option>
                                                            <option value="Engineer">Engineer</option>
                                                            <option value="Assistant-Engineer">Assistant-Engineer</option>
                                                            <option value="Technician">Technician</option>
                                                        </Form.Select>
                                                </Form.Group>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                <Button variant='btn btn-outline-secondary' onClick={()=>setShowRegisterModal(false)}>Cancel</Button>
                                                <Button variant='btn btn-outline-success' onClick={handleRegisterSubmit}>Accept</Button>
                                                </Modal.Footer>

                                            </Modal>

                                            <br />
                                            <input
                                                type="text"
                                                placeholder="Search For Users..."
                                                className="form-control mb-3"
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col'>User Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Position</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan='5'>No users</td>
                                </tr>
                            ) : (
                                filteredRequests.map((user) => (
                                    <tr key={user.empNum}>
                                        <td>{user.empNum}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.position}</td>
                                        <td>{user.status}</td>
                                        <td>
                                        <button className='btn btn-sm btn-outline-success me-1' onClick={()=>{
                                                setSelectedUser(user)
                                                setEditName(user.userName || '')
                                                setEditEmail(user.email || '')
                                                setEditPosition(user.position || '')
                                                setEditStatus(user.status ||'' )
                                                setShowModal(true)
                                                }}
                                                >Edit</button>
                                            <Modal show={showModal} onHide={()=>setShowModal(false)}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Edit Profile</Modal.Title>
                                                </Modal.Header>
                                                
                                                <Modal.Body>
                                                    <Form.Group className='mx-3'>
                                                        <Form.Label className="mx-1">
                                                        Name:
                                                        </Form.Label>
                                                        <Form.Control type='text'
                                                        placeholder={selectedUser?.userName}
                                                        value={editName} onChange={(e) => setEditName(e.target.value)}
                                                        className="rounded-3" ></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group className='mt-3 mx-3'>
                                                        <Form.Label>
                                                        Email:
                                                        </Form.Label>
                                                        <Form.Control type='email' placeholder={selectedUser?.email} value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="rounded-3"></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group className='mb-3 mx-3'>
                                                            <Form.Label>Position</Form.Label>
                                                            <Form.Select
                                                                value={editPosition || selectedUser?.position || ""}
                                                                onChange={(e) => setEditPosition(e.target.value)}
                                                                className="rounded-3"
                                                            >
                                                                <option value="" disabled>
                                                                -- Current: {selectedUser?.position || "Not Assigned"} --
                                                                </option>
                                                                <option value="Engineer">Engineer</option>
                                                                <option value="Assistant-Engineer">Assistant-Engineer</option>
                                                                <option value="Technician">Technician</option>
                                                            </Form.Select>
                                                            </Form.Group>

                                                    
                                                <Form.Group className='mb-3'>
                                                    <Form.Label>Status:</Form.Label>
                                                    <div>
                                                        {["Active", "Inactive", "Disabled"].map((status) => (
                                                            <Form.Check
                                                                key={status}
                                                                type="checkbox"
                                                                label={status}
                                                                checked={editStatus === status} // only one can be selected
                                                                onChange={() => setEditStatus(status)}
                                                            />
                                                        ))}
                                                    </div>
                                                    </Form.Group>

                                                
                                                </Modal.Body>
                                                <Modal.Footer>
                                                <Button variant='secondary' onClick={()=>setShowModal(false)}>Cancel</Button>
                                                <Button variant='success' onClick={handleAccept}>Accept</Button>
                                                </Modal.Footer>

                                            </Modal>
                                            {loggedInUser?.empNum !== user.empNum && (
                                                 <button className='btn btn-sm btn-outline-danger me-1' onClick={()=>handleDeleteClick(user)}>Delete</button>
                                            )}
                                           
                                            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Confirm Delete</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Are you sure you want to delete user <strong>{selectedUser?.userName}</strong>?
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant='btn btn-outline-secondary' onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                                                    <Button variant='btn btn-outline-danger' onClick={handleDeleteConfirm}>Delete</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    export default User
