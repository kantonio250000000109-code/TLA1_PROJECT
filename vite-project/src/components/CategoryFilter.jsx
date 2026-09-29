import React from 'react';

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory, searchQuery, onSearchChange }) {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <input 
          type="text" 
          placeholder="🔍 Search entries by title..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="category-chips">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}