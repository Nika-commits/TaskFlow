import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onToggle, onUpdate, onDelete, readOnly }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleDoubleClick = () => {
    if (readOnly) return;
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleEditSubmit = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== task.text) {
      onUpdate && onUpdate(task._id, { text: trimmedText });
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleBlur = () => {
    handleEditSubmit();
  };

  return (
    <li className={`task-item${task.completed ? ' completed' : ''}${readOnly ? ' admin-task' : ''}`}>
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="edit-input"
          autoFocus
        />
      ) : (
        <span 
          className="task-text"
          onDoubleClick={handleDoubleClick}
        >
          {task.text}
          {readOnly && <span style={{marginLeft:8, fontSize:12, color:'#6366f1', fontWeight:600}}>[Admin]</span>}
        </span>
      )}
      
      <div className="task-actions">
        {!readOnly && (
          <button
            className="toggle-btn"
            onClick={() => onToggle(task._id, !task.completed)}
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed ? '↩️' : '✔️'}
          </button>
        )}
        {!readOnly && (
          <button
            className="delete-btn"
            onClick={() => onDelete(task._id)}
            aria-label="Delete task"
          >
            🗑️
          </button>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
