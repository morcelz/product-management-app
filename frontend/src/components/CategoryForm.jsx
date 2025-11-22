import React, { useState, useEffect } from 'react';
import { categoryAPI } from '../services/api';

const CategoryForm = ({ category, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
      });
    }
  }, [category]);

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
      let response;
      if (category) {
        response = await categoryAPI.update(category.id, formData);
      } else {
        response = await categoryAPI.create(formData);
      }

      // Only call onSuccess if the request was successful
      if (response && (response.status === 200 || response.status === 201)) {
        onSuccess();
      }
    } catch (err) {
      console.error('Category save error:', err);
      let errorMessage = 'Failed to save category. Please try again.';
      
      if (err.response?.status === 403) {
        errorMessage = 'Access denied. Only administrators can create/edit categories. Please login as an administrator.';
      } else if (err.response?.status === 401) {
        errorMessage = 'Session expired. Please login again.';
      } else if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>{category ? 'Edit Category' : 'Add New Category'}</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
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
            {loading ? 'Saving...' : category ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;

