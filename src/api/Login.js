import axios from 'axios';
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [userName,setUserName]=useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { identifier:email, password });
      localStorage.setItem('token', res.data.token);
      const decoded = JSON.parse(atob(res.data.token.split('.')[1]));
      onLogin(decoded.position, decoded.empNum, decoded.userName);

      if (decoded.position === 'Engineer') {
        navigate('/Engineer');
      } else if (decoded.position === 'Assistant-Engineer') {
        navigate('/Assistant-Engineer');
      } else if (decoded.position === 'Technician') {
        navigate('/Technician');
      } else {
        setErrors('Invalid role received from server');
      }
    } catch (err) {
      console.log(err);
      setErrors("Invalid email or password");
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="bg-white shadow-sm p-3 d-flex align-items-center">
        <img
          src="https://gillsinternational.com/wp-content/uploads/2024/01/Gills-Logo-2.png"
          alt="Gills Logo"
          style={{ height: '50px', marginRight: '1rem' }}
        />
        <h2 className="h3 mx-3 my-2 fw-bold text-uppercase ">Spare Parts Management System</h2>
      </header>

      <main className="d-flex flex-grow-1 justify-content-center align-items-center">
        <div
          className="p-5 shadow"
          style={{
            backgroundColor: '#fef9f2',
            borderRadius: '1rem',
            width: '100%',
            maxWidth: '512px',
            border: '1px solid #f2eada'
          }}
        >
          <h1 className="text-center h2 fw-bold mb-4">Login</h1>
          <form onSubmit={handleLogin}>
            {errors && <p className='text-danger text-center mb-3'>{errors}</p>}

            <div className="input-group mb-3">
              <input
                type='text'
                placeholder='Username'
                className='form-control ps-4'
                style={{ borderRadius: '2rem', borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="input-group-text bg-white" style={{ borderTopRightRadius: '2rem', borderBottomRightRadius: '2rem', borderLeft: 'none' }}>
                <i className="fas fa-user my-2 me-1"></i>
              </span>
            </div>

            <div className='input-group mb-3'>
              <input
                type='password'
                placeholder='Password'
                className='form-control ps-4'
                style={{ borderRadius: '2rem', borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="input-group-text bg-white" style={{ borderTopRightRadius: '2rem', borderBottomRightRadius: '2rem', borderLeft: 'none' }}>
                <i className="fas fa-lock my-2 me-1"></i>
              </span>
            </div>

            {/* <div className="text-end mb-3">
              <a href="#" className="text-muted text-decoration-none" style={{ fontSize: '0.9rem' }}>Forgot password?</a>
            </div> */}

            <hr className="my-4 " />

            <button
              type="submit"
              className='btn w-100 fw-bold'
              style={{ backgroundColor: '#ffc107', borderColor: '#ffc107', color: '#000000ff', borderRadius: '2rem', padding: '0.75rem' }}
              disabled={!email || !password}
            >
              Login
            </button>


            {/* <div className="text-center mt-3">
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>Didn't have an account? </span>
              <Link to="/Register" className="text-muted" style={{ fontSize: '0.9rem' }}>Register</Link>
            </div> */}

          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;