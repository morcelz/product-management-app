import React, { createContext, useState, useContext, useEffect } from 'react';
import { userAPI, authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authAPI.login(username, password);
      const { token, username: responseUsername, email, role, id } = response.data;

      const userData = {
        id,
        username: responseUsername,
        email,
        role: role || 'USER',
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  const register = async (username, email, password, role = 'USER') => {
    try {
      // Use auth/register endpoint which is public
      const response = await authAPI.register({
        username,
        email,
        password,
        role,
      });

      if (response.status === 200 || response.status === 201) {
        const { token, username: responseUsername, email: responseEmail, role: responseRole, id } = response.data;
        const userData = {
          id,
          username: responseUsername,
          email: responseEmail,
          role: responseRole || 'USER',
        };

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, user: userData };
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.error || error.response?.data || 'Registration failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAdmin,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

