import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleClearSearch = () => {
    setSearchValue('');
    onSearch('');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full">
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search courses..."
        value={searchValue}
        onChange={handleChange}
        className="w-full pl-12 pr-10 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 outline-none text-gray-700"
      />
      {searchValue && (
        <button
          onClick={handleClearSearch}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
}

export default SearchBar;