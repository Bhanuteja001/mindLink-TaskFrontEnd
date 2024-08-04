// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import TaskManager from './TaskManager';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [loading , setloading] = useState(false)

  return (
  <>

    {loading && <Loader/>}
    
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} loading={loading} setloading={setloading} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} loading={loading} setloading={setloading} />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <TaskManager loading={loading} setloading={setloading} />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
          />
      </Routes>
          </>
  );
};

export default App;
