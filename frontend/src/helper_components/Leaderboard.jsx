import React from 'react';
import { FaUserCircle, FaTrophy, FaMedal } from 'react-icons/fa';
import { GiLaurelCrown } from 'react-icons/gi';

const Leaderboard = ({ topUsers }) => {
  if (!topUsers || topUsers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No leaderboard data available yet</p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <ul className="space-y-3">
        {(topUsers || []).map((user, index) => {
          // Determine the place styling and icon
          let badgeClasses, Icon;
          
          if (index === 0) {
            badgeClasses = 'bg-yellow-400 text-yellow-800';
            Icon = GiLaurelCrown;
          } else if (index === 1) {
            badgeClasses = 'bg-gray-300 text-gray-700'; 
            Icon = FaTrophy;
          } else if (index === 2) {
            badgeClasses = 'bg-amber-600 text-amber-900';
            Icon = FaMedal;
          } else {
            badgeClasses = 'bg-gray-100 text-gray-500';
            Icon = null;
          }

          return (
            <li
              key={user.username}
              className={`flex items-center p-3 rounded-lg transition-all ${
                index < 3 ? 'bg-gray-50 shadow-sm' : ''
              }`}
            >
              {/* Position indicator */}
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 mr-3">
                <span className="font-bold text-gray-700">{index + 1}</span>
              </div>
              
              {/* User image */}
              <div className="flex-shrink-0 mr-3">
                {user.image_url ? (
                  <img
                    src={user.image_url}
                    alt={`${user.username}'s avatar`}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    loading="lazy"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-400" />
                )}
              </div>
              
              {/* Username */}
              <span className="font-medium text-gray-800 flex-grow">
                {user.username}
              </span>
              
              {/* Points with badge */}
              <div className="flex items-center">
                <div className={`px-3 py-1 rounded-full ${badgeClasses} flex items-center`}>
                  {Icon && <Icon className="mr-1" />}
                  <span className="font-semibold">{user.total_points}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;