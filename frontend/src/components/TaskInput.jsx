import React, { useState } from 'react';
import './TaskInput.css';

const TaskInput = ({ onAddTask, onClearTasks, loading = false }) => {
  const [taskText, setTaskText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = taskText.trim();
    
    if (!trimmedText) {
      setError('Empty task cannot be added.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    onAddTask(trimmedText);
    setTaskText('');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleClearTasks = () => {
    onClearTasks();
  };

  return (
    <div className="input-section">
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a task for today"
          className="task-input"
          disabled={loading}
        />
        <button 
          type="submit" 
          className="add-task-btn"
          disabled={loading || !taskText.trim()}
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
        <button 
          type="button" 
          className="clear-tasks-btn"
          onClick={handleClearTasks}
          disabled={loading}
        >
          Clear Tasks
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TaskInput;
