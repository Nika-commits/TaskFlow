import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import ThemeToggle from '../components/ThemeToggle';
import TaskInput from '../components/TaskInput';
import FilterBar from '../components/FilterBar';
import ProgressBar from '../components/ProgressBar';
import TaskItem from '../components/TaskItem';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [addingTask, setAddingTask] = useState(false);
  const [stats, setStats] = useState({ total: 0, completed: 0, active: 0, completionRate: 0 });
  const [adminTasks, setAdminTasks] = useState([]);

  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const loadStats = async () => {
    try {
      const response = await api.get('/tasks/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const loadTasks = useCallback(async () => {
    if (!user || !user._id) return;
    try {
      setLoading(true);
      const response = await api.get('/tasks');
      // Split tasks: own vs admin
      const own = response.data.filter(t => t.createdBy === user._id);
      const admin = response.data.filter(t => t.createdBy !== user._id);
      setTasks(own);
      setAdminTasks(admin);
      await loadStats();
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const filterTasks = useCallback(() => {
    let filtered;
    switch (activeFilter) {
      case 'active':
        filtered = tasks.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = tasks.filter(task => task.completed);
        break;
      default:
        filtered = tasks;
    }
    setFilteredTasks(filtered);
  }, [tasks, activeFilter]);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }
    loadTasks();
  }, [isAuthenticated, user, navigate, loadTasks]);

  useEffect(() => {
    filterTasks();
  }, [tasks, activeFilter, filterTasks]);

  const handleAddTask = async (text) => {
    try {
      setAddingTask(true);
      const response = await api.post('/tasks', { text });
      setTasks(prev => [response.data, ...prev]);
      await loadStats();
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setAddingTask(false);
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, { completed });
      setTasks(prev => 
        prev.map(task => 
          task._id === taskId ? response.data : task
        )
      );
      await loadStats();
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, updates);
      setTasks(prev => 
        prev.map(task => 
          task._id === taskId ? response.data : task
        )
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(prev => prev.filter(task => task._id !== taskId));
      await loadStats();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleClearTasks = async () => {
    try {
      await api.delete('/tasks/clear-completed');
      setTasks([]); // Clear all tasks from the UI
      await loadStats();
    } catch (error) {
      console.error('Failed to clear completed tasks:', error);
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Today's Tasks</h1>
          <div className="header-actions">
            <span className="welcome-text">Welcome, {user?.username}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <main className="dashboard-main">
        <TaskInput 
          onAddTask={handleAddTask} 
          loading={addingTask}
          onClearTasks={handleClearTasks}
        />

        <FilterBar 
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        <ProgressBar 
          completed={stats.completed}
          total={stats.total}
        />

        <div className="task-section">
          <h2 style={{marginBottom: 10}}>Your Tasks</h2>
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              {activeFilter === 'all' 
                ? 'No tasks yet. Add your first task above!' 
                : `No ${activeFilter} tasks found.`
              }
            </div>
          ) : (
            <ul className="task-list">
              {filteredTasks.map(task => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onToggle={handleToggleTask}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                  readOnly={false}
                />
              ))}
            </ul>
          )}
        </div>
        {adminTasks.length > 0 && (
          <div className="task-section">
            <h2 style={{marginTop: 32, marginBottom: 10, color: 'var(--accent-color)'}}>Admin Tasks</h2>
            <ul className="task-list">
              {adminTasks.map(task => (
                <TaskItem
                  key={task._id}
                  task={task}
                  readOnly={true}
                />
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
