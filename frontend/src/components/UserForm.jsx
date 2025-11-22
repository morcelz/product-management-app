import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';

const UserForm = ({ user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: '', // Don't pre-fill password
        role: user.role || 'USER',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        role: formData.role,
      };

      // Only include password if it's a new user or password is provided
      if (!user || formData.password) {
        userData.password = formData.password;
      }

      if (user) {
        await userAPI.update(user.id, userData);
      } else {
        if (!formData.password) {
          setError('Password is required for new users');
          setLoading(false);
          return;
        }
        await userAPI.create(userData);
      }

      onSuccess();
    } catch (err) {
      setError(
        err.response?.data || 'Failed to save user. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>{user ? 'Edit User' : 'Add New User'}</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password {!user && '*'}</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!user}
            placeholder={user ? 'Leave empty to keep current password' : ''}
          />
        </div>
        <div className="form-group">
          <label>Role *</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : user ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

