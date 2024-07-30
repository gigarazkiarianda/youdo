import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard'; 
import Todos from '../pages/todos';
import Profile from '../pages/profile';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/todos" element={<Todos/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
