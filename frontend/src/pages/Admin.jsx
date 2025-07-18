import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Admin = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchAdminTasks();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      setError('Failed to load users');
    }
  };

  const fetchAdminTasks = async () => {
    try {
      const res = await api.get('/admin/tasks');
      setTasks(res.data);
    } catch (err) {
      setError('Failed to load tasks');
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    if (!taskText.trim() || selectedUsers.length === 0) {
      setError('Task and at least one user required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/admin/tasks', {
        text: taskText,
        assignedTo: selectedUsers,
      });
      setTaskText('');
      setSelectedUsers([]);
      fetchAdminTasks();
    } catch (err) {
      setError('Failed to assign task');
    }
    setLoading(false);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/admin/tasks/${taskId}`);
      fetchAdminTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <span className="welcome-text">Welcome, {user?.username} (admin)</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>
      <main className="dashboard-main admin-main-grid">
        {/* Left: Assign Task */}
        <section className="admin-assign-card">
          <h2 className="admin-section-title">Assign Task to Users</h2>
          <form className="admin-task-form" onSubmit={handleAssignTask}>
            <div className="admin-form-group">
              <label htmlFor="taskText" className="admin-label">Task</label>
              <input
                id="taskText"
                type="text"
                className="admin-task-input"
                placeholder="Task for users..."
                value={taskText}
                onChange={e => setTaskText(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="userSelect" className="admin-label">Select Users</label>
              <select
                id="userSelect"
                multiple
                className="admin-user-select"
                value={selectedUsers}
                onChange={e => setSelectedUsers(Array.from(e.target.selectedOptions, o => o.value))}
                disabled={loading}
              >
                {users.map(u => (
                  <option key={u._id} value={u._id}>{u.username} ({u.email})</option>
                ))}
              </select>
            </div>
            <button type="submit" className="add-task-btn" disabled={loading}>
              {loading ? 'Assigning...' : 'Assign Task'}
            </button>
          </form>
          {error && <div className="error-message">{error}</div>}
        </section>
        {/* Right: Tasks Assigned by You */}
        <section className="admin-tasks-card">
          <h2 className="admin-section-title" style={{ color: 'var(--accent-color)' }}>Tasks Assigned by You</h2>
          <ul className="task-list">
            {tasks.map(task => (
              <li className="task-item" key={task._id}>
                <span className="task-text">{task.text}</span>
                <span style={{ fontSize: 13, color: '#888', marginLeft: 12 }}>
                  to {task.user?.username || 'User'} ({task.user?.email || ''})
                </span>
                <div className="task-actions">
                  <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Admin; 