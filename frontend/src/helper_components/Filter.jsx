import React from 'react';

function Filter({ onFilterChange, tracks, activeTrack }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="text-sm font-medium text-gray-600 mr-1">Filter by:</div>
      <button
        className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          activeTrack === ''
            ? 'bg-purple-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onFilterChange('')}
      >
        All Tracks
      </button>
      
      {tracks.map((track, index) => (
        <button
          key={index}
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTrack === track
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onFilterChange(track)}
        >
          {track}
        </button>
      ))}
    </div>
  );
}

export default Filter;