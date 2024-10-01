import React from 'react';

function Filter({ onFilterChange, tracks, activeTrack }) {
  return (
    <div className="filter flex flex-row mb-4 space-x-4">
      <button
        className={`p-1 rounded-xl ${
          activeTrack === ''
            ? 'bg-primary text-cardBg'
            : 'bg-hoverPrimary text-cardBg'
        }`}
        onClick={() => onFilterChange('')}
      >
        All Tracks
      </button>
      {tracks.map((track, index) => (
        <button
          key={index}
          className={`p-1 rounded-xl ${
            activeTrack === track
              ? 'bg-primary text-cardBg'
              : 'bg-hoverPrimary text-cardBg'
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
