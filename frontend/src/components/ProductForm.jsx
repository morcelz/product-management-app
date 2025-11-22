import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';

const ProductForm = ({ product, categories, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        quantity: product.quantity || '',
        category: product.category?.id || '',
      });
    } else {
      // Reset form when adding a new product
      setFormData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
      });
    }
  }, [product]);

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
      if (!formData.name || !formData.price) {
        setError('Name and price are required fields');
        setLoading(false);
        return;
      }

      if (!formData.category) {
        setError('Please select a category');
        setLoading(false);
        return;
      }

      const categoryId = parseInt(formData.category);
      const selectedCat = categories.find((c) => c.id === categoryId);

      if (!selectedCat) {
        setError('Selected category is invalid');
        setLoading(false);
        return;
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity) || 0,
        category: selectedCat,
      };

      console.log('Submitting product:', productData);

      if (product) {
        await productAPI.update(product.id, productData);
      } else {
        await productAPI.create(productData);
      }

      onSuccess();
    } catch (err) {
      console.error('Error:', err);
      const errorMsg = err.response?.data?.message || err.response?.data || 'Failed to save product. Please try again.';
      setError(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
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
        <div className="form-group">
          <label>Price *</label>
          <input
            type="number"
            name="price"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
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
            {loading ? 'Saving...' : product ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

