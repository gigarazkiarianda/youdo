import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard'; 
import Todos from '../pages/todos';
import Profile from '../pages/profile';
import EditProfle from '../pages/editProfile';
import Projects from '../pages/Projects';
import Followers  from '../pages/Followers';
import Following from '../pages/following';
import Settings from '../pages/settings';
import Chat from '../pages/chat';

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
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/edit-profile" element={<EditProfle/>}/>
        <Route path="/followers" element={<Followers/>}/>
        <Route path="/following" element={<Following/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
