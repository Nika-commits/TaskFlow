import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ completed, total }) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress-bar">
      <span className="progress-text">
        {completed} of {total} tasks completed
      </span>
      <div className="bar">
        <div 
          className="fill" 
          style={{ width: `${percentage}%` }}
          aria-label={`${percentage}% completed`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
