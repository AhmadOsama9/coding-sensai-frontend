import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFullCourseDataWithCache, enrollUserInCourse, updateCachedCourseData } from '../services/FullCourseService';
import { useAuth } from '../hooks/UseAuth';
import CodeExamples from '../page_components/CodeExamples';
import CommonMistakes from '../page_components/CommonMistakes';
import Milestones from '../page_components/Milestones';

const FullCoursePage = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  // State management for expandable sections
  const [expandedTopics, setExpandedTopics] = useState({});
  const [expandedAssignments, setExpandedAssignments] = useState({});

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await fetchFullCourseDataWithCache(courseId, token);
        setCourseData(data);
        console.log('Fetched full course data:', data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, token]);

  const handleNavigateStartTheCourse = async () => {
    if (!courseData.is_enrolled) {
      try {
        await enrollUserInCourse(courseId, token);
        updateCachedCourseData(courseId, { ...courseData, is_enrolled: true });
        setCourseData({ ...courseData, is_enrolled: true });
        navigate(`/user/full-course/${courseId}`);
      } catch (error) {
        console.error("Failed to enroll user:", error);
      }
    } else {
      navigate(`/user/full-course/${courseId}`);
    }
  };

  const toggleTopic = (topicId) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const toggleAssignments = (topicId) => {
    setExpandedAssignments((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  if (loading) return <div className="text-center text-lg text-primary">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 bg-background">
      {/* Course Header */}
      <div className="mb-10">
        <div className="flex flex-col gap-4 justify-center items-center">
          <img
            src={courseData.course_img_url}
            alt={courseData.course_name}
            className="w-48 h-48 rounded-lg shadow-md object-cover border border-border"
          />
          <div>
            <h1 className="text-5xl font-bold text-primaryText">{courseData.course_name}</h1>
            <p className="text-secondaryText mt-4 text-lg leading-relaxed">
              {courseData.course_description}
            </p>
            {courseData.is_enrolled ? (
              <button
                className="mt-4 px-8 py-3 text-lg font-semibold text-white bg-primary rounded-full shadow-lg hover:bg-hoverPrimary transition-transform transform hover:scale-105"
                onClick={handleNavigateStartTheCourse}
              >
                Continue Learning
              </button>
            ) : (
              <button
                className="mt-4 px-8 py-3 text-lg font-semibold text-white bg-primary rounded-full shadow-lg hover:bg-hoverPrimary transition-transform transform hover:scale-105"
                onClick={handleNavigateStartTheCourse}
              >
                Enroll Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-primaryText">Topics</h2>

        {courseData.topics.map((topic) => (
          <div key={topic.topic_id} className="mb-10">
            {/* Clickable Topic Header */}
            <div className="cursor-pointer mb-4" onClick={() => toggleTopic(topic.topic_id)}>
              <h3 className="text-2xl font-bold text-primaryText flex justify-between">
                {topic.topic_name}
                <span className="text-primaryText">{expandedTopics[topic.topic_id] ? '-' : '+'}</span>
              </h3>
            </div>

            {/* Topic Content (Conditional Rendering) */}
            {expandedTopics[topic.topic_id] && (
              <div>
                <p className="text-secondaryText mt-1">{topic.topic_description}</p>

                {/* Common Mistakes Section */}
                <CommonMistakes commonMistakes={topic.commonMistakes} />

                {/* Code Examples Section */}
                <CodeExamples codeExamples={topic.codeExamples} />

                {/* Assignments Section */}
                <div className="cursor-pointer mt-2" onClick={() => toggleAssignments(topic.topic_id)}>
                  <h4 className="text-xl font-semibold text-primaryText flex justify-between">
                    Assignment
                    <span>{expandedAssignments[topic.topic_id] ? '-' : '+'}</span>
                  </h4>
                  {expandedAssignments[topic.topic_id] && topic.assignment && (
                    <div>
                      <h5>{topic.assignment.title}</h5>
                      <p>{topic.assignment.description}</p>
                    </div>
                  )}
                </div>

                {/* Milestones Section */}
                <Milestones milestones={topic.milestones} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullCoursePage;
