import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({onLogin}) => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [errors,setErrors] = useState('')
  const navigate = useNavigate()
  
  const handleLogin = async (event)=>{
    event.preventDefault()
    try{
      const res = await axios.post('http://localhost:8800/api/login',{email,password})
      const {position} = res.data
      onLogin(position)

      if(position === 'Engineer'){
        navigate('/Engineer')
      }
      else if(position === 'Assistent-Engineer')
      {
        navigate('/Assistent-Engineer')
      }else if(position === 'Technician'){
        navigate('/Technician')
      }else {
        setErrors('Invalid rolde received from server')
      }
    }catch(err){
      console.log(err)
      setErrors("Invalid email or password")
    }
  }


  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
      <div className='p-3 bg-white w-25'>

        <form className='form-01'>
          <h1>Login Form</h1>

          {errors && <p className='text-red-500 mb-4'>{errors}</p> }

          <div className='mb-3'>
            <label id='email'>Email :</label>
            <input type='email' placeholder='Enter email' name='email'
            onChange={(e)=>setEmail(e.target.value)}
            className='form-control'
            required/>

            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label id='password'>Passsword :</label>
            <input type='password' placeholder='Enter Password' name='password'
            onChange={(e)=>setPassword(e.target.value)}
            className='form-control'
            required/>

            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>

          <button onClick={handleLogin} className='btn btn-success' disabled={!email||!password}>Login</button>
          <p>Didn't have an Account:<button className='btn btn-light'><Link to={"/Register"}>Register</Link></button></p>
        </form>

      </div>
    </div>
  )
}

export default Login
