import React from 'react';
import './FilterBar.css';

const FilterBar = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All Tasks' },
    { key: 'active', label: 'Remaining Tasks' },
    { key: 'completed', label: 'Completed Tasks' },
  ];

  return (
    <div className="filter-buttons">
      {filters.map((filter) => (
        <button
          key={filter.key}
          data-filter={filter.key}
          className={`filter-btn ${activeFilter === filter.key ? 'active-filter' : ''}`}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
