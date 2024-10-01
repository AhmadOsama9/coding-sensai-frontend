import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFullUserCourseDataWithCache } from '../services/FullUserCourseService';
import { useAuth } from '../hooks/UseAuth';
import Sidebar from '../page_components/Sidebar';
import MainContent from '../page_components/MainContent';
import { useUserCourse } from '../hooks/UseUserCourse';
import ProjectComponent from '../page_components/ProjectComponent';

const FullUserCoursePage = () => {
  const { courseId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const { courseData, updateCourseData } = useUserCourse();
  
  const [loading, setLoading] = useState(!courseData);
  const [error, setError] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showProject, setShowProject] = useState(false);

  useEffect(() => {
    const fetchUserCourseData = async () => {
      if (!courseData) {
        try {
          const data = await fetchFullUserCourseDataWithCache(courseId, token);
          updateCourseData(data); // Store fetched data in context
        } catch (err) {
          setError(err.message);
          if (err.message === 'Subscription required: Please subscribe to access this course') {
            setTimeout(() => {
              navigate("/pricing");
            }, 5000);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserCourseData();
  }, [courseId, token, navigate, updateCourseData, courseData]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic); // Set the selected topic when clicked in the sidebar
    setShowProject(false);
  };

  if (loading) {
    return <div className="text-center mt-8 text-primaryText">Loading user course data...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-primary">
        Error: {error}
        {error === 'Subscription required: Please subscribe to access this course' && (
          <div className="text-accent mt-4">Redirecting to the pricing page in 5 seconds...</div>
        )}
        <button
          onClick={() => setError(null)}
          className="mt-4 px-4 py-2 bg-primary hover:bg-hoverPrimary text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!courseData) {
    return <div className="text-center mt-8 text-primaryText">No course data available</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-background flex">
      <div className="w-fit">
        <Sidebar courseId={courseId} topics={courseData.topics} onTopicSelect={handleTopicSelect} setShowProject={setShowProject} />
      </div>
      <div className="w-3/4 p-4">
        {showProject ? (
          <ProjectComponent courseId={courseId} />
        ) : selectedTopic ? (
          <MainContent topic={selectedTopic} />
        ) : (
          <div className="text-center text-secondaryText">Select a topic to see details.</div>
        )}
      </div>
    </div>
  );
};

export default FullUserCoursePage;
