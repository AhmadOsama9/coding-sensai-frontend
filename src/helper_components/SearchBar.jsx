import React from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ onSearch }) {
  return (
    <div className="relative mb-4">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
      <input
        type="text"
        placeholder="Search courses..."
        className="border rounded pl-10 pr-4 py-2 focus:outline-none focus:border-primary"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
