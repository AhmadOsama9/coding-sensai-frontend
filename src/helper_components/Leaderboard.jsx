import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Leaderboard = ({ topUsers }) => {
  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-cardBg shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">Leaderboard</h2>
      <ul>
        {(topUsers || []).map((user, index) => {
          let placeClasses = '';
          if (index === 0) {
            placeClasses = 'bg-yellow-400 text-white'; // First place
          } else if (index === 1) {
            placeClasses = 'bg-gray-300 text-white'; // Second place
          } else if (index === 2) {
            placeClasses = 'bg-yellow-600 text-white'; // Third place
          } else {
            placeClasses = 'bg-secondaryBg text-gray-900'; // Other places
          }

          return (
            <li
              key={user.username}
              className={`flex items-center justify-between p-4 mb-2 rounded-lg shadow-md ${placeClasses}`}
            >
              {user.image_url ? (
                <img
                  src={user.image_url}
                  alt={`${user.username}'s avatar`}
                  className="w-10 h-10 rounded-full mr-4"
                  loading="lazy"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-500 mr-4" />
              )}

              <span className="font-bold text-lg text-primary">
                {index + 1}. {user.username}
              </span>
              <span className="font-semibold text-lg text-muted">{user.total_points} points</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;
