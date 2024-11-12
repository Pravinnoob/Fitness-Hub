import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import { Box } from '@mui/material';
import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './components/Signup'; // Import Signup component
import Login from './components/Login'; // Import Login component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignup, setIsSignup] = useState(true);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
  };

  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      {isAuthenticated ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          {isSignup ? (
            <Signup onAuth={handleAuthentication} toggleForm={toggleForm} />
          ) : (
            <Login onAuth={handleAuthentication} toggleForm={toggleForm} />
          )}
        </>
      )}
    </Box>
  );
};

export default App;
