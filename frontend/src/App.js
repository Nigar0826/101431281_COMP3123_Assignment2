import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import EmployeeList from './components/employeeList';
import Login from './components/login';
import Signup from './components/signup';

const App = () => {
  const handleLogout = () => {
    localStorage.clear(); // Clear any session data
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav style={{ padding: '10px', background: '#f4f4f4', display: 'flex', gap: '10px' }}>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/employeeList">Employee List</Link>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: 'auto',
              cursor: 'pointer',
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Logout
          </button>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
