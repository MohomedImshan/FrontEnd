import User from './User/User';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import EngineerDashboard from './Position/EngineerDashboard';
import TechnicianDashboard from './Position/TechnicianDashboard';
import AssistantEngineerDashBoard from './Position/AssistantEngineerDashBoard';
import Register from './api/Register';
import Login from './api/Login';
import SpareParts from './Position/SpareParts';
//requestform
import RequestForm from './Request/RequestForm';
import Notification from './Request/Notification';
import { useEffect, useState } from 'react';


function App() {

  const [userPosition,setUserPosition] = useState(null)

  useEffect(()=>{
    const storePosition = localStorage.getItem('position')
    if(storePosition){
      setUserPosition(storePosition)
    }
  },[])

  const handleLogin=(position)=>{
    setUserPosition(position)
    localStorage.setItem('position',position)
  }
  const handleLogout = () =>{
    setUserPosition(null)
    localStorage.removeItem('position')
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/User" element={<User />} />

          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
         
          <Route path="/RequestForm" element={<RequestForm />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/SpareParts" element={<SpareParts />} />
         

        {userPosition === 'Engineer' &&(
          <Route path='/Engineer' element={<EngineerDashboard onLogout={handleLogout} />} />
        )}

        {userPosition === 'Technician' &&(
          <Route path='/Technician' element={<TechnicianDashboard onLogout={handleLogout} />} />
        )}

        {userPosition === 'Assistant_Engineer' &&(
          <Route path='/Assistant_Engineer' element={<AssistantEngineerDashBoard onLogout={handleLogout} />} />
        )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
