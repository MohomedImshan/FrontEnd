import User from './User/User';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/User" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
