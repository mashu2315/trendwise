import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Header = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-gray-200 text-xl font-bold">
          TrendWise
        </Link>
        <div >
          {user ? (
            <>
              <Link to="/profile" className="text-gray-200 hover:text-blue-400 mr-4 hover:scale-105">
                Profile
              </Link>
              <button onClick={handleSignOut} className="text-gray-200 hover:text-blue-400 hover:scale-105">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="text-gray-200 hover:text-blue-400 hover:scale-105">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;