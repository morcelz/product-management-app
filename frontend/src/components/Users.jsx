import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import UserForm from './UserForm';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('username');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAll();
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await userAPI.delete(id);
      setSuccess('User deleted successfully');
      loadUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete user');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingUser(null);
    loadUsers();
    setSuccess('User saved successfully');
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

  // Filter and sort users
  const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getSortClass = (field) => {
    if (sortField !== field) return 'sortable';
    return `sortable sort-${sortOrder}`;
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Users Management</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add User
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search users by username or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {showForm && (
        <UserForm
          user={editingUser}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      <div className="table-container">
        {paginatedUsers.length === 0 ? (
          <div className="card empty-state">
            <div className="empty-state-icon">👥</div>
            <p>No users found</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th
                  className={getSortClass('username')}
                  onClick={() => handleSort('username')}
                >
                  Username
                </th>
                <th
                  className={getSortClass('email')}
                  onClick={() => handleSort('email')}
                >
                  Email
                </th>
                <th
                  className={getSortClass('role')}
                  onClick={() => handleSort('role')}
                >
                  Role
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className="user-role"
                      style={{
                        backgroundColor:
                          user.role === 'ADMIN' ? '#667eea' : '#95a5a6',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                      }}
                    >
                      {user.role || 'USER'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </div>
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
            Page {currentPage} of {totalPages} ({filteredUsers.length} users)
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

export default Users;

