import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar /> {/* Navbar displayed on all pages */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/products" element={<Products />} /> {/* Products page */}
          <Route path="/suppliers" element={<Suppliers />} /> {/* Suppliers page */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard */}
        </Routes>
        <Footer /> {/* Footer displayed on all pages */}
      </div>
    </Router>
  );
};

export default App;
