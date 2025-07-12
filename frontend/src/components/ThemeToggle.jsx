import React from 'react';
import { useAuth } from '../context/AuthContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { user, updateTheme } = useAuth();
  const isDark = user?.theme === 'dark';

  const handleToggle = async () => {
    const newTheme = isDark ? 'light' : 'dark';
    await updateTheme(newTheme);
  };

  return (
    <button 
      className="toggle-theme-btn" 
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
