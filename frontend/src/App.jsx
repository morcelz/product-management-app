import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Products from './components/Products';
import Categories from './components/Categories';
import Users from './components/Users';
import './App.css';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/products" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <div className="app">
      {user && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/products" replace /> : <Login />} />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute adminOnly>
                <Users />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/products" replace />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;

