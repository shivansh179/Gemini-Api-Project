// Navbar.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { logout } from '../firebase'; // Import the logout function
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate('/'); // Redirect to login page or home page
    } catch (error) {
      toast.error("Error logging out");
      console.error("Logout error: ", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ToastContainer />
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Your App</h1>
        <div className="relative">
          {user ? (
            <div className="relative inline-block text-left">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700 transition"
              >
                <span>{user.email}</span>
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <div className="py-2">
                    <span className="block px-4 py-2 text-gray-700">Logged in as {user.email}</span>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
