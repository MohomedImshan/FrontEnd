import React, { useEffect, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import '../Header/header.css'
import { Navbar, Nav, Container,Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function Header({ onLogout }) {
    const [userPosition,setUserPosition] = useState(null)
    const [userId,setUserId] = useState(null)
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false); 


    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
            navigate('/')
            return
        }

        try{
            const decoded = jwtDecode(token)
            if(decoded.exp * 1000 < Date.now()){
                handleLogout()
            }else{
                const storedUser = localStorage.getItem('position')
                const userId = localStorage.getItem('empNum')
                if(storedUser){
                    setUserPosition(storedUser)
                }
                if(userId){
                    setUserId(userId)
                }
            }
           
        }
        catch{
            handleLogout()
        }
    },[navigate])

    const handleLogout =()=>{
        localStorage.removeItem('position')
        localStorage.removeItem('empNum')
        localStorage.removeItem('token')
        navigate('/')

    }
    

  return (
    <header>
        <Navbar expand="lg" bg="light" className="shadow-sm" expanded={expanded} >
            <Container fluid>
            <Navbar.Brand href="https://gillsinternational.com/" className="navbar-logo">
                <img src="https://gillsinternational.com/wp-content/uploads/2024/01/Gills-Logo-2.png" alt="Logo" className="logo-img"/>
            </Navbar.Brand>
        {/*for mobile*/}
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)}/>

      { /* }<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>*/}
        <Navbar.Collapse id="navbar-nav">
       
            <ul className="navbar-nav">
            <Nav className={`ms-auto nav-links align-items-center horizontal-menu ${expanded ? "show" : ""}`}>

            {(userPosition === 'Engineer')&&(
                <li className="nav-item active">
                <Nav.Link as={Link} to="/Engineer" onClick={() => setExpanded(false)}>Home </Nav.Link>
            </li>
            )}
            {(userPosition === 'Technician')&&(
                <li className="nav-item active">
                <Nav.Link as={Link} to="/Technician" onClick={() => setExpanded(false)}>Home </Nav.Link>
            </li>
            )}
            {(userPosition === 'Assistant-Engineer')&&(
                <li className="nav-item active">
                <Nav.Link as={Link} to="/Assistant-Engineer" onClick={() => setExpanded(false)}>Home </Nav.Link>
            </li>
            )}

            
            {( userPosition==='Engineer' || userPosition === 'Engineer-Assistent')&&(
            <li className="nav-item">
                <Nav.Link as={Link} to="/User" onClick={() => setExpanded(false)}>User Details</Nav.Link>
            </li>)}
            {( userPosition ==='Engineer')&&(
            <li className="nav-item">
                
                <Nav.Link as={Link} to="/Spareparts" onClick={() => setExpanded(false)}>Spare Parts</Nav.Link>
            </li>)}
            {( userPosition==='Engineer' || userPosition === 'Engineer-Assistent')&&(
            <li className="nav-item">
                <Nav.Link as={Link} to="/Notification" onClick={() => setExpanded(false)}>Notification</Nav.Link>
            </li>)}
            <li className="nav-item">
                <Nav.Link as={Link} to="/Requests" onClick={() => setExpanded(false)}>Requests</Nav.Link>
            </li>
            <li className="nav-item">
                <Nav.Link as={Link} to="/OwnRequests" onClick={() => setExpanded(false)} >My Requests</Nav.Link>
            </li>
            
            {( userPosition==='Engineer' || userPosition === 'Engineer-Assistent')&&(
            <li className="nav-item">
                <Nav.Link as={Link} to="/Reject" onClick={() => setExpanded(false)} >Rejects</Nav.Link>
            </li>)}
            {( userPosition==='Engineer' || userPosition === 'Engineer-Assistent')&&(
            <li className="nav-item">
                <Nav.Link as={Link} to="/Report" onClick={() => setExpanded(false)} >Download</Nav.Link>
            </li>)}
            {( userPosition==='Engineer' || userPosition === 'Engineer-Assistent')&&(
            <li className="nav-item">
                <Nav.Link  as={Link} to="/Report" onClick={() => setExpanded(false)} >Log Files</Nav.Link>
            </li>)}
            {/* <li>
                 <form className="form-inline my-2 my-lg-0 justify-item-right ">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>    
                </form> 
            </li> */}

             {/* Logout Button */}
            <Button variant="outline-danger" className="logout-btn ms-3 mt-2 mt-lg-0" onClick={handleLogout} >LogOut</Button>

            </Nav>
        </ul>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>
  )
}

export default Header
