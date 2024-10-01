import React from 'react';
import { useUserCourse } from '../hooks/UseUserCourse';

const TestControls = ({ milestoneId, topicId, mistakeId }) => {
  const { updateMilestoneCompletion, updateTopicCompletion, updateCommonMistakeCompletion } = useUserCourse();

  const handleMilestoneTest = () => {
    updateMilestoneCompletion(milestoneId, true); // Set to true for testing
    alert(`Milestone ${milestoneId} marked as complete.`);
  };

  const handleTopicTest = () => {
    updateTopicCompletion(topicId, true); // Set to true for testing
    alert(`Topic ${topicId} marked as complete.`);
  };

  const handleCommonMistakeTest = () => {
    updateCommonMistakeCompletion(mistakeId, true); // Set to true for testing
    alert(`Common mistake ${mistakeId} marked as complete.`);
  };

  return (
    <div className="space-y-2">
      <button onClick={handleMilestoneTest} className="px-4 py-2 bg-primary text-white rounded hover:bg-hoverPrimary">
        Test Milestone Completion
      </button>
      <button onClick={handleTopicTest} className="px-4 py-2 bg-primary text-white rounded hover:bg-hoverPrimary">
        Test Topic Completion
      </button>
      <button onClick={handleCommonMistakeTest} className="px-4 py-2 bg-primary text-white rounded hover:bg-hoverPrimary">
        Test Common Mistake Completion
      </button>
    </div>
  );
};

export default TestControls;
