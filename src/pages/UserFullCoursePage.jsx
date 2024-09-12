import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFullUserCourseDataWithCache } from '../services/FullUserCourseService';
import { useAuth } from '../hooks/UseAuth';

const FullUserCoursePage = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCourseData = async () => {
      try {
        const data = await fetchFullUserCourseDataWithCache(courseId, token);
        setCourseData(data);
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
    };

    fetchUserCourseData();
  }, [courseId, token, navigate]);

  if (loading) return <div className="text-center mt-8 text-white">Loading user course data...</div>;

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        Error: {error}
        {error === 'Subscription required: Please subscribe to access this course' && (
          <div className="text-yellow-400 mt-4">Redirecting to the pricing page in 5 seconds...</div>
        )}
      </div>
    );
  }

  if (!courseData) return <div className="text-center mt-8 text-white">No course data available</div>;


  // When I reach this page after the payment
  // I will have to make it displays the whole data

  return (
    <div className="p-8 bg-gradient-to-tr from-[#1C222A] to-[#1e2731] min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto bg-red-900 rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-white">{courseData.course_name}</h1>
        <img
          src={courseData.course_img_url}
          alt={courseData.course_name}
          className="w-full h-80 object-cover mb-6 rounded-lg shadow-md"
        />
        <p className="text-lg text-gray-200 mb-6">{courseData.course_description}</p>

        {courseData.isProjectUnlocked ? (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white">Project Unlocked!</h2>
            <p className="text-yellow-300">{courseData.project_description}</p>
          </div>
        ) : (
          <p className="text-yellow-300 mb-6">Complete all topics to unlock the project!</p>
        )}

        <h3 className="text-2xl font-semibold mb-4 text-white">Topics:</h3>
        <ul className="list-none space-y-4">
          {courseData.topics.map((topic) => (
            <li key={topic.topic_id} className="p-4 bg-red-800 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">{topic.topic_name}</h4>
              <p className="text-yellow-300 mb-2">{topic.topic_description}</p>
              <p className="text-sm text-yellow-200">Milestones: {topic.total_milestones}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FullUserCoursePage;
