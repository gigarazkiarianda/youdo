// src/routes/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import UserProfile from '../pages/UserProfile';
import Projects from '../pages/Projects';
import Todos from '../pages/Todos';
import Notifications from '../pages/Notifications';
import SocialMedia from '../pages/SocialMedia';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/social-media" element={<SocialMedia />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
