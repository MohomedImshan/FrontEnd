import User from './User/User';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import EngineerDashboard from './Position/EngineerDashboard';
import Register from './api/Register';
import Login from './api/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/User" element={<User />} />
          <Route path="/Engineer" element={<EngineerDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
