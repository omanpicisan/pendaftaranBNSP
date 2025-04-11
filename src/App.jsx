import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./components/Sidebar";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <div className="d-flex vh-100">
        <Sidebar className="bg-dark text-light p-3" style={{ width: '250px' }} />
        <div className="flex-grow-1 p-4 bg-light overflow-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/pendaftaran" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
