import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'
function TechnicianDashboard({ empNum, onLogout }) {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showChangePasswordmodel, setChangePasswordModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedempNum = localStorage.getItem('empNum');
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No Token is Found, redirecting to login...');
          navigate('/');
        }
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Technician/${storedempNum}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data.users?.[0] || null);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleAccept = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No Token is Found, redirecting to login...');
        navigate('/');
      }
      const updatedUser = {
        userName: editName || user.userName,
        email: editEmail || user.email,
      };
      await axios.put(`${process.env.REACT_APP_API_URL}/Technician/${user.empNum}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser((prevUser) => ({
        ...prevUser,
        userName: updatedUser.userName,
        email: updatedUser.email
      }));
      setShowModal(false);
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No Token is Found, redirecting to login...');
        navigate('/');
      }
      if (!password) {
        alert("Please enter new password");
        return;
      }
      if (password !== confirmpassword) {
        alert("Passwords do not match");
        return;
      }
      const data = {
        confirmpassword: confirmpassword
      };
      await axios.put(`${process.env.REACT_APP_API_URL}/Technician/${user.empNum}/changepassword`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Password changed successfully!!");
      setChangePasswordModal(false);
      setpassword('');
      setconfirmPassword('');
    } catch (err) {
      console.error('Failed to update user:', err);
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-vh-100" style={{ backgroundImage: `url(${require('./../bg.jpg')})`}}>
      <Header />

      <div className="container my-5 px-5">
        {user ? (
          <div className="card shadow rounded-3 p-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center">
                <div className="rounded-circle d-flex justify-content-center align-items-center me-4" style={{ width: '100px', height: '100px', backgroundColor: '#e9ecef' }}>
                  <i className="bi bi-person-fill" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                </div>
                <div className="text-start">
                  <h1 className="h1 fw-bold mb-0 text-uppercase">{user.userName}</h1>
                  <p className="fs-3 mb-0">{user.position}</p>
                </div>
              </div>

              <div className="d-flex">
                <button
                  className="btn btn-warning rounded-pill px-3 py-2 fw-bold d-flex align-items-center me-2"
                  style={{ backgroundColor: '#ffc107', borderColor: '#ffc107', color: '#000' }}
                  onClick={() => {
                    if (user) {
                      setEditName(user.userName);
                      setEditEmail(user.email);
                      setShowModal(true);
                    }
                  }}
                >
                  <i className="bi bi-pencil-square me-2"></i> Customize Profile
                </button>
                <button
                  className="btn btn-warning rounded-pill px-3 py-2 fw-bold d-flex align-items-center"
                  style={{ backgroundColor: '#ffc107', borderColor: '#ffc107', color: '#000' }}
                  onClick={() => setChangePasswordModal(true)}
                >
                  <i className="bi bi-key me-2"></i>Change Password
                </button>
              </div>
            </div>

            <hr className="my-4" />

            <div className="space-y-1 text-start">
              <p><strong>Full Name:</strong> {user.userName}</p>
              <p><strong>Position:</strong> {user.position}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Status:</strong> {user.status}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted mt-10">Loading technician profile...</p>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-dialog-centered">
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
        <Modal.Footer className="border-0" style={{ backgroundColor: '#f8f9fa', borderBottomLeftRadius: 'calc(1rem - 1px)', borderBottomRightRadius: 'calc(1rem - 1px)' }}>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            className="rounded-pill px-4"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleAccept}
            className="rounded-pill px-4"
            style={{ backgroundColor: '#ffc107', borderColor: '#ffc107', color: '#000' }}
          >
            Accept
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showChangePasswordmodel} onHide={() => setChangePasswordModal(false)} dialogClassName="modal-dialog-centered">
        <Modal.Header closeButton className='mx-3'>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mx-3'>
            <Form.Label className='mx-1'>Enter New Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter current password...'
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="rounded-3"
            />
          </Form.Group>
          <Form.Group className='mt-3 mx-3'>
            <Form.Label>Re-Enter Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter New Password...'
              value={confirmpassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              className="rounded-3"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer
          className="border-0"
          style={{
            backgroundColor: '#f8f9fa',
            borderBottomLeftRadius: 'calc(1rem - 1px)',
            borderBottomRightRadius: 'calc(1rem - 1px)'
          }}
        >
          <Button
            variant="secondary"
            onClick={() => setChangePasswordModal(false)}
            className="rounded-pill px-4"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleChangePassword}
            className="rounded-pill px-4"
            style={{ backgroundColor: '#ffc107', borderColor: '#ffc107', color: '#000' }}
          >
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TechnicianDashboard;