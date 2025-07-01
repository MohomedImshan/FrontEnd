

import User from './User/User';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

import EngineerDashboard from './Position/EngineerDashboard';
import Register from './api/Register';
import Login from './api/Login';
import SpareParts from './Position/SpareParts';
//requestform
import RequestForm from './Request/RequestForm';
import Notification from './Request/Notification';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/User" element={<User />} />

          <Route path="/Engineer" element={<EngineerDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />


          <Route path="/RequestForm" element={<RequestForm />} />
          <Route path="/Notification" element={<Notification />} />


      
        
          <Route path="/RequestForm" element={<RequestForm />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/SpareParts" element={<SpareParts />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
