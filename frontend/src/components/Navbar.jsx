import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">Product Management System</div>
        <div className="navbar-links">
          <Link
            to="/products"
            className={location.pathname === '/products' ? 'active' : ''}
          >
            Products
          </Link>
          <Link
            to="/categories"
            className={location.pathname === '/categories' ? 'active' : ''}
          >
            Categories
          </Link>
          {isAdmin() && (
            <Link
              to="/users"
              className={location.pathname === '/users' ? 'active' : ''}
            >
              Users
            </Link>
          )}
          <div className="user-info">
            <span>{user?.username}</span>
            <span className="user-role">{user?.role}</span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

