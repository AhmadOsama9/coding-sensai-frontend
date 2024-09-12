import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwt') || null);
  const [tokenExpiry, setTokenExpiry] = useState(localStorage.getItem('jwt_expiry') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || null);
  const [imageUrl, setImageUrl] = useState(localStorage.getItem('imageUrl') || null);
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);

  const navigate = useNavigate();

  const handleSetToken = (newToken, expiresIn, user, image) => {
    setToken(newToken);
    setShowLogoutWarning(false);

    if (newToken) {
      localStorage.setItem('jwt', newToken);
      const expiryTime = Date.now() + expiresIn * 1000;
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
    } else {
      localStorage.removeItem('jwt');
      localStorage.removeItem('jwt_expiry');
      localStorage.removeItem('username');
      localStorage.removeItem('imageUrl');
      setTokenExpiry(null);
      setUsername(null);
      setImageUrl(null);
      navigate('/login');
    }
  };

  const checkTokenExpiry = () => {
    if (tokenExpiry) {
      const timeLeft = tokenExpiry - Date.now();
      const warningThreshold = 3600 * 1000; 
      const gracePeriod = 30000;

      if (timeLeft < warningThreshold && timeLeft > gracePeriod) {
        setShowLogoutWarning(true);
        setTimeout(() => {
          handleSetToken(null);
        }, gracePeriod);
      } else if (timeLeft <= 0) {
        handleSetToken(null);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(checkTokenExpiry, 15 * 60 * 1000); // Check every 15 minutes
    checkTokenExpiry();
    return () => clearInterval(interval);
  }, [tokenExpiry]);

  return (
    <AuthContext.Provider value={{ token, username, imageUrl, setToken: handleSetToken, showLogoutWarning }}>
      {showLogoutWarning && <div>You will be logged out soon due to inactivity.</div>}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
