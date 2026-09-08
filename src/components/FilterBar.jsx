import React from 'react';
import { Search } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const FilterBar = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="filter-bar container">
      <div className="category-pills">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="search-box">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search pickles, chutneys, spices..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};
