// src/page_components/Sidebar.js

import React, { useState } from 'react';
import TopicProgressChart from '../helper_components/TopicProgressChart';
import Popout from './Popout';
import { useAuth } from '../hooks/UseAuth';

const Sidebar = ({ courseId, topics, onTopicSelect, setShowProject }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const { token } = useAuth();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleTopicClick = (topic) => {
    if (topic.can_enter) {
      onTopicSelect(topic);
    } else {
      setPopupMessage('You must complete the previous topic to enter this one.');
      setShowPopup(true);
    }
  };

  const handleProjectClick = () => {
    setPopupMessage("Make sure you have completed all the topics else you won't be able to access the project");
    setShowPopup(true);
    setShowProject(true);
  };

  return (
    <div className={`relative ${isOpen ? 'w-48' : 'w-16'} transition-all duration-300`}>
      <button
        onClick={toggleSidebar}
        className="absolute top-2 right-2 bg-secondary rounded-full p-2 hover:bg-hoverPrimary focus:outline-none"
      >
        {isOpen ? '❌' : '📜'}
      </button>

      <div className={`bg-cardBg p-4 rounded-lg shadow-md ${isOpen ? 'block' : 'hidden'}`}>
        <h3 className="text-xl font-bold text-primaryText mb-2">Topics</h3>

        <ul className="space-y-2">
          {topics.map((topic) => {
            const bgColor = topic.can_enter
              ? topic.user_completed
                ? 'bg-green-200 text-green-900'
                : 'bg-primary text-white'
              : 'bg-muted text-gray-400';

            const iconColor = topic.can_enter
              ? topic.user_completed
                ? 'text-green-400'
                : 'text-secondary'
              : 'text-red-400';

            return (
              <li
                key={topic.topic_id}
                className={`p-2 rounded-md cursor-pointer hover:bg-hoverPrimary transition-colors duration-200 ${bgColor}`}
                onClick={() => handleTopicClick(topic)}
              >
                <div className="flex items-center">
                  {isOpen ? (
                    <h4 className="text-base font-semibold">{topic.topic_name}</h4>
                  ) : (
                    <span className="text-sm">{topic.topic_name.charAt(0)}</span>
                  )}
                  <span className={`ml-2 ${iconColor}`}>
                    {topic.can_enter ? (
                      topic.user_completed ? (
                        <span className="text-green-400">✅</span>
                      ) : (
                        <span className="text-secondary">🔓</span>
                      )
                    ) : (
                      <span className="text-red-400">🔒</span>
                    )}
                  </span>
                </div>

                <TopicProgressChart
                  userPassedMilestones={topic.user_passed_milestones}
                  totalMilestones={topic.total_milestones}
                />
              </li>
            );
          })}
        </ul>

        <button
          onClick={handleProjectClick}
          className="mt-6 bg-accent text-primaryText p-2 rounded-md hover:bg-hoverPrimary focus:outline-none w-full transition-colors"
        >
          View Course Project
        </button>
      </div>

      <Popout
        isVisible={showPopup}
        title="Notification"
        message={popupMessage}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
};

export default Sidebar;
