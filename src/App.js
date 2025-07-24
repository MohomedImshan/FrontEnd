import User from './User/User';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import EngineerDashboard from './Position/EngineerDashboard';
import TechnicianDashboard from './Position/TechnicianDashboard';
import AssistantEngineerDashBoard from './Position/AssistantEngineerDashBoard';
import Register from './api/Register';
import Login from './api/Login';
import SpareParts from './Spare-Parts/SpareParts';
//requestform
import RequestForm from './Request/RequestForm';
import Notification from './Request/Notification';
import { useEffect, useState } from 'react';
import AddEmployee from './api/AddEmployee';


function App() {

  const [userPosition,setUserPosition] = useState(null)
  const [empNum,setempNum] = useState(null)

  useEffect(()=>{
    const storePosition = localStorage.getItem('position')
    const storedempNum = localStorage.getItem('empNum')

    if(storePosition){
      setUserPosition(storePosition)
    }
    if(storedempNum)
      setempNum(storedempNum)
  },[])

  const handleLogin=(position,empNum)=>{
    setUserPosition(position)
    setempNum(empNum)
    localStorage.setItem('position',position)
    localStorage.setItem('empNum',empNum)

  }
  const handleLogout = () =>{
    setUserPosition(null)
    setempNum(null)
    localStorage.removeItem('position')
    localStorage.removeItem('empNum')
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/User" element={<User />} />

          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/Register" element={<Register />} />
         
          <Route path="/Requests" element={<RequestForm />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/SpareParts" element={<SpareParts />} />
          <Route path="/Add-Employee" element={<AddEmployee />}></Route>
          {/* <Route path="/Requests" element={<Request />} ></Route> */}
         

        {userPosition === 'Engineer' &&(
          <Route path='/Engineer' element={<EngineerDashboard empNum={empNum} onLogout={handleLogout} />} />
        )}



        {userPosition === 'Technician' &&(
          <Route path='/Technician' element={<TechnicianDashboard empNum={empNum} onLogout={handleLogout} />} />
        )}

        {userPosition === 'Assistant_Engineer' &&(
          <Route path='/Assistant-Engineer' element={<AssistantEngineerDashBoard empNum={empNum} onLogout={handleLogout} />} />
        )}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
