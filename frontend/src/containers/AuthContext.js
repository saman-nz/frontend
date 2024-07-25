import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: null,
    refreshToken: null,
    username: null
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setAuth({
        accessToken: response.data.token,
        refreshToken: response.data.refreshToken,
        // username: response.data.user.username, // Store username from response if available
      });
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/token', { token: auth.refreshToken });
      setAuth(prevState => ({ ...prevState, accessToken: response.data.accessToken }));
    } catch (error) {
      console.error('Token refresh failed:', error.response.data);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', { token: auth.refreshToken });
      setAuth({ accessToken: null, refreshToken: null });
    } catch (error) {
      console.error('Logout failed:', error.response.data);
    }
  };

  // Call refreshToken every 15 minutes
  useEffect(() => {
    const interval = setInterval(refreshToken, 15 * 60 * 1000); // 15 minutes in milliseconds
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, refreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
