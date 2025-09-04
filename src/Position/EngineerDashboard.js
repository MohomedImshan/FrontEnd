import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function EngineerDashboard({ empNum, onLogout }) {
  const [user, setUser] = useState(null);

  const [showModal,setShowModal]= useState(false)
  const [showChangePasswordmodel,setChangePasswordModal]= useState(false)


  const [editName,setEditName] = useState('')
  const [editEmail,setEditEmail] = useState('')
  const [password,setpassword] = useState('')
  const [confirmpassword,setconfirmPassword] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedempNum = localStorage.getItem('empNum')
        const token = localStorage.getItem('token')
        //const position = localStorage.getItem('position')
        //console.log(empNum)
        if (!token) {
          console.error('No Token is Found,redirecting to login...')
          navigate('/')
        }
        const res = await axios.get(`http://localhost:8800/Engineer/${storedempNum}`, {
          headers: {
            Authorization: `Bearer ${token}`
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
        //position:user.position,
        
      }
      await axios.put(`http://localhost:8800/Engineer/${user.empNum}`,updatedUser
      ,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setUser((prevUser)=>({...prevUser,

        userName:updatedUser.userName,
        email:updatedUser.email
    }))

      setShowModal(false)
    }catch(err){
      console.error('Failed to update user:',err)
    }
  }
  
  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('No Token is Found,redirecting to login...')
        navigate('/')
      }
      if (!password) {
        alert("Please enter new password")
        return
      }
      if (password !== confirmpassword) {
        alert("Passwords do not match")
        return
      }

      const data = {

        confirmpassword: confirmpassword
      }
      await axios.put(`http://localhost:8800/Engineer/${user.empNum}/changepassword`
        , data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert("Password changed successfully!!")
      setChangePasswordModal(false)
      setpassword('')
      setconfirmPassword('')
    } catch (err) {
      console.error('Failed to update user:', err)
      alert(err.response?.data?.message || 'Update failed')
    }
  }

  return (
    // Replaced min-h-screen with min-vh-100 and bg-white with a light background color
    <div className="min-vh-100" style={{ backgroundColor: '#f0f5fa' }}>
      {/* Top Navigation (unchanged as requested) */}
      <Header />


      {/* Main content container with padding */}
      <div className="container my-5 px-5">
        {/* Engineer Profile Section */}
        {user ? (
          // Replaced bg-gray-50 and shadow with Bootstrap card and shadow classes
          <div className="card shadow rounded-3 p-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              {/* Profile image and info */}
              <div className="d-flex align-items-center">
                {/* Placeholder for the profile picture with rounded corners */}
                <div className="rounded-circle d-flex justify-content-center align-items-center me-4" style={{ width: '100px', height: '100px', backgroundColor: '#e9ecef' }}>
                  <i className="bi bi-person-fill" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                </div>
                <div className="text-start">
                  <h1 className="h1 fw-bold mb-0 text-uppercase">{user.userName}</h1>
                  <p className="fs-3 mb-0">{user.position}</p>
                  {/* <p className="text-muted mb-0">{user.empNum}</p> */}
                </div>
              </div>

              {/* Edit Button styled with rounded corners and the accent color */}
              <button
                className="btn btn-warning rounded-pill mb-5 px-2 py-2 fw-bold"
                style={{ backgroundColor: '#ffc107', borderColor: '#ffc107', color: '#000' }}
                onClick={() => {
                  if (user) {
                    setEditName(user.userName)
                    setEditEmail(user.email)
                    //setEditPosition(user.position)
                    setShowModal(true)
                  }
                }}>
                <img src="https://cdn-icons.flaticon.com/svg/3917/3917484.svg?token=exp=1756995245~hmac=bd04b284e3c7804f32c0205e94ab907e"
                  alt="edit"
                  width="20" height="20"
                  class="mx-2 my-2" />
              </button>

      
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


      {/* Modal remains unchanged, but I added a rounded-3 class to the form control as a minor style improvement */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className='mx-3'>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mx-3'>
            <Form.Label className="mx-1">
              Name:
            </Form.Label>
            <Form.Control type='text'
              placeholder={user?.userName}
              value={editName} onChange={(e) => setEditName(e.target.value)}
              className="rounded-3" ></Form.Control>
          </Form.Group>
          <Form.Group className='mt-3 mx-3'>
            <Form.Label>
              Email:
            </Form.Label>
            <Form.Control type='email' placeholder={user?.email} value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="rounded-3"></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant='success' onClick={handleAccept}>Accept</Button>
        </Modal.Footer>
      </Modal>
      <button className='btn btn-sm btn-outline-success me-1' onClick={() => { setChangePasswordModal(true) }}>Change Password</button>
      <Modal show={showChangePasswordmodel} onHide={() => setChangePasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <Form.Group className='mb-3'>
            <Form.Label>
              Enter New Password:
            </Form.Label>
            <Form.Control type='password' placeholder='Enter current password...' value={password} onChange={(e) => setpassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>
              Re-Enter Password :
            </Form.Label>
            <Form.Control type='password' placeholder='Enter New Password...' value={confirmpassword} onChange={(e) => setconfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setChangePasswordModal(false)}>Cancel</Button>
          <Button variant='success' onClick={handleChangePassword}>Accept</Button>
        </Modal.Footer>

      </Modal>

    </div>
  );
}

export default EngineerDashboard;
