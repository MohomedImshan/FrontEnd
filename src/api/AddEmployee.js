import React, { useState } from 'react'
import validation from './RegisterValidation'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddEmployee() {
    const [values,setValues] = useState({
        userName:'',
        email:'',
        password:'',
        position:''
    })
    const handleInput = (event)=>{
        setValues(prev=>({...prev,[event.target.name]:event.target.value}))
    }
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()
    const handleSubmit = (event)=>{

        event.preventDefault()

        const validationErrors = validation(values)
        setErrors(validationErrors)
        if(Object.keys(validationErrors).length === 0 ){
            axios.post("http://localhost:8800/Add-Employee",values)
            .then(res =>{
                navigate('/')
            })
            .catch(err =>console.log(err))
        }

   }


  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
        <div className='p-3 bg-white w-25'>

            <form onSubmit={handleSubmit} className='form-01'>
                <h1>Registration Form</h1>
                

                <div className='mb-3'>
                    <label id='userName'>User Name :</label>
                    <input type='text' name='userName' value={values.userName} onChange={handleInput} placeholder='Enter user name' className='form-control' required></input>
                    {errors.userName && <span className='text-danger' >{errors.userName}</span>}
                </div>
                <div className='mb-3'>
                    <label id='email'>E Mail : </label>
                    <input type='text' name='email' value={values.email} onChange={handleInput} placeholder='Enter email' className='form-control' required></input>
                    {errors.email && <span className='text-danger' >{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label id='password'>Passsword :</label>
                    <input type='password' name='password'value={values.password} onChange={handleInput} placeholder='Enter password' className='form-control'  required  />
                    {errors.password && <span className='text-danger' >{errors.password}</span>}
                </div>

                <div className='mb-3'>
                    <label id='position'>Position :</label>
                    <select className="form-select" name='position' value={values.position} onChange={handleInput} aria-label="Default select example">
                        <option value="">Open this select menu</option>
                        <option value="Engineer">Engineer</option>
                        <option value="Assistant_Engineer">Assistant Engineer</option>
                        <option value="Technician">Technician</option>
                    </select>
                </div>
                


                <button type='submit' className='btn btn-success'>Add Employee</button><br /><br />


            </form>
        </div>
        
    </div>
  )
}

export default AddEmployee
