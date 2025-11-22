import React, { useState, useEffect } from 'react';
import { categoryAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CategoryForm from './CategoryForm';

const Categories = () => {
  const { isAdmin } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryAPI.getAll();
      setCategories(response.data);
      setError('');
    } catch (err) {
      console.error('Load categories error:', err);
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.message || 
                          err.response?.data ||
                          err.message || 
                          'Failed to load categories';
      setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      await categoryAPI.delete(id);
      setSuccess('Category deleted successfully');
      loadCategories();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete category');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingCategory(null);
    setError(''); // Clear any previous errors
    loadCategories();
    setSuccess('Category saved successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleAddCategory = () => {
    setError(''); // Clear errors when opening form
    setShowForm(true);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filter and sort categories
  const filteredCategories = categories
    .filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortField] || '';
      let bValue = b[sortField] || '';

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getSortClass = (field) => {
    if (sortField !== field) return 'sortable';
    return `sortable sort-${sortOrder}`;
  };

  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Categories</h1>
        {isAdmin() && (
          <button className="btn btn-primary" onClick={handleAddCategory}>
            Add Category
          </button>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {showForm && (
        <CategoryForm
          category={editingCategory}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      <div className="table-container">
        {paginatedCategories.length === 0 ? (
          <div className="card empty-state">
            <div className="empty-state-icon">📁</div>
            <p>No categories found</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th
                  className={getSortClass('name')}
                  onClick={() => handleSort('name')}
                >
                  Name
                </th>
                <th
                  className={getSortClass('description')}
                  onClick={() => handleSort('description')}
                >
                  Description
                </th>
                <th>Products Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description || '-'}</td>
                  <td>-</td>
                  <td>
                    {isAdmin() && (
                      <div className="action-buttons">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleEdit(category)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(category.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    {!isAdmin() && <span style={{ color: '#999' }}>View only</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages} ({filteredCategories.length}{' '}
            categories)
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Categories;

