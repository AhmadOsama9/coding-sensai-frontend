import React, { useEffect, useState } from 'react';
import { getAssignmentByTopicId, markAssignmentAsCompleted } from '../services/AssignmentService';
import { useUserCourse } from '../hooks/UseUserCourse';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import Popout from '../page_components/Popout';

const AssignmentComponent = ({ topicId, token, assignment }) => {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const { updateAssignmentCompletion } = useUserCourse();

  const markAsComplete = async (assignmentId) => {
    setLoading(true);
    try {
      await markAssignmentAsCompleted(assignmentId, token);
      updateAssignmentCompletion(topicId, assignmentId, true); // Update assignment completion
      setPopupMessage('Assignment marked as complete');
    } catch (error) {
      console.error(error);
      setPopupMessage(`Failed to mark assignment as complete: Plase refrech the page if you have marked it before`);
    } finally {
      setLoading(false);
      setShowPopup(true);
    }
  };

  // Render a loading state
  if (loading) {
    return <p>Loading Assignment...</p>;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-primaryText">Assignment</h3>
      <h4 className="text-lg font-medium">{assignment.assignment_title}</h4>
      <div className="markdown-body">
        <ReactMarkdown>{assignment.assignment_description}</ReactMarkdown> {/* Render Markdown */}
      </div>
      <button 
        onClick={() => markAsComplete(assignment.assignment_id)} 
        className="px-4 py-2 bg-primary text-white rounded hover:bg-hoverPrimary"
        disabled={assignment.completed} // Disable button if already completed
      >
        {assignment.completed ? 'Completed' : 'Mark as Complete'}
      </button>

        <Popout
            isVisible={showPopup}
            title="Assignment Completion"
            message={popupMessage}
            onClose={() => setShowPopup(false)}
        />
    </div>
  );
};

export default AssignmentComponent;
