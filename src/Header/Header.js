import React, { useEffect, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import '../Header/header.css'


function Header() {
    const [userPosition,setUserPosition] = useState(null)
    const [userId,setUserId] = useState(null)
    const navigate = useNavigate()


    useEffect(()=>{
        const storedUser = localStorage.getItem('position')
        const userId = localStorage.getItem('empNum')
        if(storedUser){
            setUserPosition(storedUser)
        }
        if(userId){
            setUserId(userId)
        }
    },[])

    const handleLogout =()=>{
        localStorage.removeItem('position')
        localStorage.removeItem('empNum')
        navigate('/')

    }
    

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <Link className="navbar-brand" to="https://gillsinternational.com/">
            <img src="https://gillsinternational.com/wp-content/uploads/2024/01/Gills-Logo-2.png" width="75" height="75" alt="" />
        </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">


            {(userPosition === 'Engineer')&&(
                <li className="nav-item active">
                <Link className="nav-link" to="/Engineer">Home </Link>
            </li>
            )}
            {(userPosition === 'Technician')&&(
                <li className="nav-item active">
                <Link className="nav-link" to="/Technician">Home </Link>
            </li>
            )}
            {(userPosition === 'Assistant_Engineer')&&(
                <li className="nav-item active">
                <Link className="nav-link" to="/Assistant-Engineer">Home </Link>
            </li>
            )}

            
            <li className="nav-item">
                <Link className="nav-link " to="/User">User Details</Link>
            </li>
            {( userPosition ==='Engineer')&&(
            <li className="nav-item">
                
                <Link className="nav-link" to="/Spareparts">Spare Parts</Link>
            </li>)}
            {( userPosition==='Engineer' || userPosition === 'Engineer-Assistent')&&(
            <li className="nav-item">
                <Link className="nav-link" to="/Notifications">Notification</Link>
            </li>)}
            <li className="nav-item">
                <Link className="nav-link " to={`/Requests/${userId}`} >Requests</Link>
            </li>
            <li>
                 <form className="form-inline my-2 my-lg-0 justify-item-right ">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>    
                </form> 
            </li>
            <li className='btn-logout nav-item '>
                <button className='logout-btn btn btn-outline-danger my-2 my-sm-0'
                onClick={handleLogout}
                >LogOut</button>
            </li>
            
    </ul>

    </div>
</nav>
    </header>
  )
}

export default Header
