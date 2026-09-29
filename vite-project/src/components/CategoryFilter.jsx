import React from 'react';

const CATEGORIES = ['All', 'Salary', 'Freelance', 'Investments', 'Gifts', 'Side Business', 'Other'];

export default function CategoryFilter({ selectedCategory, onSelectCategory, searchQuery, onSearchChange }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Search Input Bar */}
      <div style={{ position: 'relative', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="🔍  Search entries by title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #3d3d3d',
            backgroundColor: '#383838',
            color: '#ffffff',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: '1px solid ' + (isActive ? '#6c5ce7' : '#e0e0e0'),
                backgroundColor: isActive ? '#6c5ce7' : '#ffffff',
                color: isActive ? '#ffffff' : '#4a4a4a',
                fontWeight: isActive ? '600' : '500',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
