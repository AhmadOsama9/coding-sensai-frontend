import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseOverviewWithCache } from '../services/CourseOverviewService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';

const CourseOverviewPage = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect triggered', { courseId });
    const fetchCourseOverview = async () => {
      try {
        const data = await fetchCourseOverviewWithCache(courseId);
        setCourseData(data);
        console.log('Fetched course overview data:', data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseOverview();
  }, [courseId]);

  const handleShowFullDetails = () => {
    navigate(`/full-course/${courseId}`);
  };

  if (loading) return <div className="text-primaryText text-center mt-8">Loading...</div>;
if (error) return <div className="text-primary text-center mt-8">Error: {error}</div>;
if (!courseData) return <div className="text-primaryText text-center mt-8">No course data found</div>;

return (
  <div className="p-8 bg-gradient-to-tr from-background to-cardBg min-h-screen flex items-center justify-center">
    <div className="max-w-4xl mx-auto bg-cardBg rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        {token ? (
          <button
            className="bg-primary text-cardBg font-bold py-2 px-4 rounded hover:bg-hoverPrimary transition-colors duration-300"
            onClick={handleShowFullDetails}
          >
            Show Full Details
          </button>
        ) : (
          <button
            className="bg-primary text-cardBg font-bold py-2 px-4 rounded hover:bg-hoverPrimary transition-colors duration-300"
            onClick={() => navigate('/login')}
          >
            Login to view full course details
          </button>
        )}
      </div>
      
      <h1 className="text-4xl font-bold mb-6 text-primaryText">{courseData.course.name}</h1>
      <img
        src={courseData.course.course_img_url}
        alt={courseData.course.name}
        className="w-full h-80 object-cover mb-6 rounded-lg shadow-md"
        loading="lazy"
      />
      <p className="text-secondaryText mb-6 text-lg">{courseData.course.description}</p>

      <div>
        <h3 className="text-2xl font-semibold mb-4 text-primaryText">Topics:</h3>
        <ul className="list-none space-y-4">
          {courseData.topics.map((topic, index) => (
            <li key={index} className="p-4 bg-muted rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2 text-primaryText">{topic.topic_name}</h4>
              <p className="text-secondaryText mb-2">{topic.topic_description}</p>
              <p className="text-sm text-muted">Milestones: {topic.milestone_count}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

};

export default CourseOverviewPage;
