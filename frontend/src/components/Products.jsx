import React, { useState, useEffect } from 'react';
import { productAPI, categoryAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ProductForm from './ProductForm';

const Products = () => {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    // Reload categories when the form is opened
    if (showForm) {
      loadCategories();
    }
  }, [showForm]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      console.log('Categories loaded:', response.data);
      setCategories(response.data || []);
    } catch (err) {
      console.error('Failed to load categories:', err);
      setCategories([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productAPI.delete(id);
      setSuccess('Product deleted successfully');
      loadProducts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete product');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    loadCategories(); // Reload categories before showing form
    setShowForm(true);
  };

  const handleAddProduct = () => {
    loadCategories(); // Reload categories before showing form
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    loadProducts();
    loadCategories(); // Reload categories after saving product
    setSuccess('Product saved successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category?.id === parseInt(selectedCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'category') {
        aValue = a.category?.name || '';
        bValue = b.category?.name || '';
      }

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
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getSortClass = (field) => {
    if (sortField !== field) return 'sortable';
    return `sortable sort-${sortOrder}`;
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        {isAdmin() && (
          <button className="btn btn-primary" onClick={handleAddProduct}>
            Add Product
          </button>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      <div className="table-container">
        {paginatedProducts.length === 0 ? (
          <div className="card empty-state">
            <div className="empty-state-icon">📦</div>
            <p>No products found</p>
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
                <th
                  className={getSortClass('price')}
                  onClick={() => handleSort('price')}
                >
                  Price
                </th>
                <th
                  className={getSortClass('quantity')}
                  onClick={() => handleSort('quantity')}
                >
                  Quantity
                </th>
                <th
                  className={getSortClass('category')}
                  onClick={() => handleSort('category')}
                >
                  Category
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description || '-'}</td>
                  <td>${product.price?.toFixed(2) || '0.00'}</td>
                  <td>{product.quantity || 0}</td>
                  <td>{product.category?.name || '-'}</td>
                  <td>
                    {isAdmin() && (
                      <div className="action-buttons">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(product.id)}
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
            Page {currentPage} of {totalPages} ({filteredProducts.length} products)
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

export default Products;

