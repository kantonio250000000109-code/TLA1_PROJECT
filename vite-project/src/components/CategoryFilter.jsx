import React from 'react';

const CATEGORIES = ['All', 'Salary', 'Freelance', 'Investments', 'Gifts', 'Side Business', 'Other'];

export default function CategoryFilter({ selectedCategory, onSelectCategory, searchQuery, onSearchChange }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="🔍  Search revenue entries by title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #334155',
            backgroundColor: '#1e293b',
            color: '#ffffff',
            fontSize: '0.9rem',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid ' + (isActive ? '#6366f1' : '#334155'),
                backgroundColor: isActive ? '#6366f1' : '#0f172a',
                color: isActive ? '#ffffff' : '#94a3b8',
                fontWeight: isActive ? '600' : '500',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
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
