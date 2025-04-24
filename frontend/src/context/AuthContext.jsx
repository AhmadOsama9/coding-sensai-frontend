import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwt') || null);
  const [tokenExpiry, setTokenExpiry] = useState(localStorage.getItem('jwt_expiry') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || null);
  const [imageUrl, setImageUrl] = useState(localStorage.getItem('imageUrl') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);

  const navigate = useNavigate();

  const handleSetToken = (newToken, expiresIn, user, image, userRole = "user") => {
    setToken(newToken);
    setShowLogoutWarning(false);

    if (newToken) {
      localStorage.setItem('jwt', newToken);
      const expiryTime = Date.now() + expiresIn;
      setTokenExpiry(expiryTime);
      localStorage.setItem('jwt_expiry', expiryTime);

      if (user) {
        setUsername(user);
        localStorage.setItem('username', user);
      }
      if (image) {
        setImageUrl(image);
        localStorage.setItem('imageUrl', image);
      }
      setRole(userRole);
      localStorage.setItem('role', userRole);
    } else {
      localStorage.clear();
      setTokenExpiry(null);
      setUsername(null);
      setImageUrl(null);
      setRole(null);
      // Also want to close the sidebar when logging out
      // but I leave that for later and also that problem accours
      // the screen where it is not xs nor larger
      navigate('/login');
    }
  };

  const checkTokenExpiry = () => {
    console.log("Checking token expiry...");
  
    // Always fetch the latest tokenExpiry from localStorage
    const storedTokenExpiry = Number(localStorage.getItem('jwt_expiry'));
    console.log("Token Expiry value from localStorage is: ", storedTokenExpiry);
  
    if (storedTokenExpiry) {
      const timeLeft = storedTokenExpiry - Date.now();
      console.log("Token Time Left is: ", timeLeft); // Log time left
  
      const warningThreshold = 3600 * 1000; // 1 hour before expiration
      const gracePeriod = 30000; // 30 seconds before logging out
  
      if (timeLeft <= 0) {
        console.log("Token has expired."); // Log token expiry
        handleSetToken(null); // Clear token if expired
      } else if (timeLeft < warningThreshold && timeLeft > gracePeriod) {
        console.log("Token is about to expire. Showing warning."); // Log near-expiry case
        setShowLogoutWarning(true);
        setTimeout(() => {
          handleSetToken(null); // Log out after grace period
        }, gracePeriod);
      }
    }
  };

  useEffect(() => {
    // Call checkTokenExpiry on component mount to check the initial state
    checkTokenExpiry();
  
    // Set an interval to check periodically (every 15 minutes)
    const interval = setInterval(checkTokenExpiry, 15 * 60 * 1000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ token, username, imageUrl, role, setToken: handleSetToken, showLogoutWarning }}>
      {showLogoutWarning && <div>You will be logged out soon due to inactivity.</div>}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
