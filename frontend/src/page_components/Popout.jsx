import React from 'react';

const Popout = ({ isVisible, title, message, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-cardBg p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-primaryText mb-4">{title}</h2>
        <p className="text-primaryText mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-hoverPrimary"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popout;
