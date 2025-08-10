    import React, { useEffect, useState } from 'react'
    import axios from "axios"
    import Header from '../Header/Header'
    import api from '../api/api'
    //import {  Link } from 'react-router-dom'
    import { Form,Button, Modal } from 'react-bootstrap'

    function User() {
        const [users, setUsers] = useState([])
        const [showModal,setShowModal] = useState(false) 
        const [showDeleteModal,setShowDeleteModal] = useState(null)
        const [selectedUser,setSelectedUser] = useState(null)
        const [editStatus,setEditStatus] = useState('')
        const [showRegisterModal,setShowRegisterModal] = useState(false)
        
        const [newPassword, setNewPassword] = useState("");
        const [newUserName, setNewUserName] = useState("");
        const [newEmail, setNewEmail] = useState("");
        const [newPosition, setNewPosition] = useState("");

        const fetchAllUsers = async () => {
            try {
                
                const res = await api.get('/User')
                setUsers(res.data.users)
            } catch (err) {
                console.log(err)
                
            }
        }
        useEffect(() => {
            
            fetchAllUsers()
        }, [])

        const handleRegisterSubmit = async () =>{
            try{
                await axios.post("http://localhost:8800/User",{
                    
                    userName:newUserName,
                    email:newEmail,
                    password:newPassword,
                    position:newPosition

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
            setEditStatus(user.status ||'' )
            setShowModal(true)
        }
        const handleAccept = async()=>{
            if(!selectedUser) return;

            try{
                await axios.put(`http://localhost:8800/Engineer/${selectedUser.empNum}`,{status:editStatus})
                
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
                await axios.delete(`http://localhost:8800/Engineer/${selectedUser.empNum}`)
                
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
                <div className='home'><br />
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
                                                            <option value="Assistent-Engineer">Assistent-Engineer</option>
                                                            <option value="Technician">Technician</option>
                                                        </Form.Select>
                                                </Form.Group>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                <Button variant='secondary' onClick={()=>setShowRegisterModal(false)}>Cancel</Button>
                                                <Button variant='success' onClick={handleRegisterSubmit}>Accept</Button>
                                                </Modal.Footer>

                                            </Modal>

                                            <br />
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
                                users.map((user) => (
                                    <tr key={user.empNum}>
                                        <td>{user.empNum}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.position}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            <button className='btn btn-sm btn-outline-success me-1' onClick={()=>handleEditClick(user)}>Edit</button>
                                            <Modal show={showModal} onHide={()=>setShowModal(false)}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Edit Profile</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                <Form.Group className='mb-3'>
                                                    <Form.Label>Status:</Form.Label>
                                                        <Form.Select
                                                            value={editStatus}
                                                            onChange={(e) => setEditStatus(e.target.value)}
                                                        >
                                                            <option value="">Select status</option>
                                                            <option value="Active">Active</option>
                                                            <option value="Inactive">Inactive</option>
                                                            <option value="Disabled">Disabled</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                
                                                </Modal.Body>
                                                <Modal.Footer>
                                                <Button variant='secondary' onClick={()=>setShowModal(false)}>Cancel</Button>
                                                <Button variant='success' onClick={handleAccept}>Accept</Button>
                                                </Modal.Footer>

                                            </Modal>
                                            <button className='btn btn-sm btn-outline-danger me-1' onClick={()=>handleDeleteClick(user)}>Delete</button>
                                            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Confirm Delete</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Are you sure you want to delete user <strong>{selectedUser?.userName}</strong>?
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant='secondary' onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                                                    <Button variant='danger' onClick={handleDeleteConfirm}>Delete</Button>
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
