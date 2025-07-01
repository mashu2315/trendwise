



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import axios from 'axios';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
    const result =  await signInWithPopup(auth, googleProvider);
    console.log(result);
     const token = await result.user.getIdToken();

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const userData = await response.json();
      console.log("User Data:", userData);
      navigate('/');
       setIsLoading(false);
    } catch (error) {
      console.error('Sign-in error:', error);
      setError(error.message || 'Failed to initiate Google sign-in');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isLoading ? 'Loading...' : 'Sign in with Google'}
      </button>
    </div>
  );
};

export default LoginPage;


