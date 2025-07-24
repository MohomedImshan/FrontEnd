    import React, { useEffect, useState } from 'react'
    import axios from "axios"
    import Header from '../Header/Header'
    import {  Link } from 'react-router-dom'
    import { Form,Button, Modal } from 'react-bootstrap'

    function User() {
        const [users, setUsers] = useState([])
        const [showModal,setShowModal] = useState(false) 
        const [showDeleteModal,setShowDeleteModal] = useState(null)
        const [selectedUser,setSelectedUser] = useState(null)
        const [editStatus,setEditStatus] = useState('')

        const fetchAllUsers = async () => {
            try {
                const res = await axios.get("http://localhost:8800/User")
                setUsers(res.data.users)
            } catch (err) {
                console.log(err)
            }
        }
        useEffect(() => {
            
            fetchAllUsers()
        }, [])

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
                await fetchAllUsers()
                setShowModal(false)
                setSelectedUser(null)
            }catch(err){
                console.error("Failed to update user status",err)
            }

            
        }
        const handleDeleteConfirm = async () => {
            if(!selectedUser) return

            try{
                await axios.delete(`http://localhost:8800/Engineer/${selectedUser.empNum}`)
                setShowDeleteModal(false)
                selectedUser(null)
                fetchAllUsers()
            }catch(err){
                console.error("Failed to delete user",err)
            }
        }
        return (
            <div>
                <Header />
                <div className='home'>
                    <button className='btn btn-success'><Link to={"/Add-Employee"}>Register Employee</Link></button>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
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
                                            <button className='btn btn-success' onClick={()=>handleEditClick(user)}>Edit</button>
                                            <Modal show={showModal} onHide={()=>setShowModal(false)}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Edit Profile</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                <Form.Group className='mb-3'>
                                                    <Form.Label>
                                                    Status:
                                                    </Form.Label>
                                                    <Form.Control type='text' 
                                                    placeholder={user?.status}
                                                    value={editStatus} onChange={(e)=>setEditStatus(e.target.value)}></Form.Control>
                                                </Form.Group>
                                                
                                                </Modal.Body>
                                                <Modal.Footer>
                                                <Button variant='secondary' onClick={()=>setShowModal(false)}>Cancel</Button>
                                                <Button variant='success' onClick={handleAccept}>Accept</Button>
                                                </Modal.Footer>

                                            </Modal>
                                            <button className='btn btn-danger' onClick={()=>handleDeleteClick(user)}>Delete</button>
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
