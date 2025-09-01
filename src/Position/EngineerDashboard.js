import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal,Form,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function EngineerDashboard({empNum,onLogout}) {
  const [user, setUser] = useState(null);
  const [showModal,setShowModal]= useState(false)


  const [editName,setEditName] = useState('')
  const [editEmail,setEditEmail] = useState('')
  const [editPosition,setEditPosition] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedempNum = localStorage.getItem('empNum')
        const token = localStorage.getItem('token')
        //const position = localStorage.getItem('position')
        //console.log(empNum)
        if(!token){
          console.error('No Token is Found,redirecting to login...')
          navigate('/')
        }
        const res = await axios.get(`http://localhost:8800/Engineer/${storedempNum}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        // Show only the first user for now
        setUser(res.data.users?.[0] || null);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);
  const handleAccept = async ()=>{
    try{
      const token = localStorage.getItem('token')
      if(!token){
        console.error('No Token is Found,redirecting to login...')
        navigate('/')
      }
      const updatedUser = {
        userName : editName || user.userName, 
        email:editEmail || user.email,
        position:user.position
      }
      await axios.put(`http://localhost:8800/Engineer/${user.empNum}`,updatedUser
      ,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setUser((prevUser)=>({...prevUser,...updatedUser}))
      setShowModal(false)
    }catch(err){
      console.error('Failed to update user:',err)
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Navigation (Do NOT change) */}
      <Header />

      {/* Add Button */}
      <div className="container px-8 mt-4">
        {/* <button className='btn btn-success'> <Link className="bg-green-600 text-white px-4 py-2 padding-10 rounded hover:bg-green-700" to="/Register">
          Add Employee
        </Link>
        </button> */}
          <button className='btn btn-sm btn-outline-success me-1'onClick={()=>{
            if(user){
              setEditName(user.userName)
              setEditEmail(user.email)
              setEditPosition(user.position)

            
            setShowModal(true)}
          }}>Edit</button>
          <Modal show={showModal} onHide={()=>setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Name:
                </Form.Label>
                <Form.Control type='text' 
                placeholder={user?.userName}
                value={editName} onChange={(e)=>setEditName(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Email:
                </Form.Label>
                <Form.Control type='email' placeholder={user?.email} value={editEmail} onChange={(e)=>setEditEmail(e.target.value)}></Form.Control>
              </Form.Group>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={()=>setShowModal(false)}>Cancel</Button>
              <Button variant='success' onClick={handleAccept}>Accept</Button>
            </Modal.Footer>

          </Modal>
      </div>

      {/* Engineer Profile Section */}
      <div className="container p-8">
        {user ? (
          <div className="bg-gray-50 shadow rounded-lg p-6">
            <div className="flex items-center space-x-8">
              <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
              <div>
                <h1 className="text-3xl font-bold">{user.userName}</h1>
                <p className="text-xl font-semibold text-gray-700">{user.position}</p>
                <p className="text-sm text-gray-500">{user.empNum}</p>
              </div>
            </div>

            <hr className="border-yellow-500 my-6" />

            <div className="space-y-3 text-lg">
              <p><strong>Full Name:</strong> {user.userName}</p>
              
              <p><strong>Position</strong> {user.position}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Status:</strong> {user.status}</p>

            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">Loading engineer profile...</p>
        )}
      </div>
    </div>
  );
}

export default EngineerDashboard;
