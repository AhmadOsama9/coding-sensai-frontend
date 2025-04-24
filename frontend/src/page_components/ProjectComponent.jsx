import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import ProjectReviewDetails from '../course_main_content_helper/ProjectReviewDetails';
import ProjectSubmissionForm from '../course_main_content_helper/ProjectSubmissionForm';
import Popout from '../page_components/Popout';
import { fetchProjectContent, fetchProjectReview } from '../services/ProjectService';
import { useAuth } from '../hooks/UseAuth';

const ProjectComponent = ({ courseId }) => {
  const { token } = useAuth();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showProjectReview, setShowProjectReview] = useState(false);
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const project = await fetchProjectContent(courseId, token);
        setProjectData(project);
      } catch (error) {
        console.error('Error fetching project:', error);
        setPopupMessage('Failed to fetch project details. Make sure you have completed all the topics.');
        setShowPopup(true);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchProjectDetails();
    }
  }, [courseId, token]);

  const handleShowProjectReview = async () => {
    try {
      if (!showProjectReview) {
        const reviewData = await fetchProjectReview(projectData.course_project_id, token);
        setReviewData(reviewData);
        setShowProjectReview(true);
      } else {
        setShowProjectReview(false);
      }
    } catch (error) {
      console.error('Error fetching project review:', error);
      setPopupMessage('Failed to fetch project review details.');
      setShowPopup(true);
    }
  };

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-500">Loading Project...</p>
      ) : projectData ? (
        <div className="mt-4 p-4 bg-white border border-border rounded-lg shadow-sm">
          <h4 className="font-bold text-lg text-primaryText">{projectData.course_project_title}</h4>
          <div className="prose max-w-none text-primaryText">
            <ReactMarkdown>{projectData.course_project_description}</ReactMarkdown>
          </div>
          <div className="prose max-w-none text-primaryText">
            <ReactMarkdown>{projectData.course_project_notes}</ReactMarkdown>
          </div>

          {projectData.submitted ? (
            <button
              className="bg-secondary text-white p-2 rounded-md w-full mt-4 hover:bg-hoverPrimary"
              onClick={handleShowProjectReview}
            >
              {showProjectReview ? 'Hide Submission Result' : 'View Submission Result'}
            </button>
          ) : (
            <ProjectSubmissionForm
              courseId={courseId}
              projectId={projectData.course_project_id}
              onSubmitProject={(submittedData) => {
                setProjectData({ ...projectData, submitted: true, reviewData: submittedData.reviewData });
                setPopupMessage('Project submitted successfully!');
                setShowPopup(true);
              }}
            />
          )}

          {showProjectReview && <ProjectReviewDetails reviewData={reviewData} />}
        </div>
      ) : (
        <p className="text-center text-red-500">Project data could not be loaded.</p>
      )}

      <Popout
        isVisible={showPopup}
        title="Notification"
        message={popupMessage}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
};

export default ProjectComponent;
