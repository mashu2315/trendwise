import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const token = await user.getIdToken();
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/${user.uid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error.message);
      }
    };
    fetchUser();
  }, [user, navigate]);

  if (error) return <div className="container mx-auto p-4">Error: {error}</div>;
  if (!userData) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="border p-4 rounded shadow">
       
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=male"
            alt={userData.name}
            className="w-24 h-24 rounded-full mb-4"
          />
       
        <p><strong>Name:</strong> {userData.name || 'N/A'}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleString()}</p>
        <button
          onClick={() => auth.signOut().then(() => navigate('/'))}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;