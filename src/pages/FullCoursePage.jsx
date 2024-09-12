import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFullCourseDataWithCache } from '../services/FullCourseService';
import { useAuth } from '../hooks/UseAuth';

const FullCoursePage = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

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
  }, [courseId]);

  const handleNavigateStartTheCourse = () => {
    navigate(`/user/full-course/${courseId}`);
  };

  if (loading) return <div className="text-center text-lg text-primary">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 bg-background">
      {/* Course Header */}
      <div className="mb-10">
        <div className="flex flex-col gap-4 justify-center items-center">
          {/* Enhanced Button Design */}
          <button
            className="mt-4 px-8 py-3 text-lg font-semibold text-white bg-primary rounded-full shadow-lg hover:bg-hoverPrimary transition-transform transform hover:scale-105"
            onClick={handleNavigateStartTheCourse}
          >
            Start Course
          </button>

          {/* Updated Image Style */}
          <img
            src={courseData.course_img_url}
            alt={courseData.course_name}
            className="w-48 h-48 rounded-lg shadow-md object-cover border border-border"
          />

          {/* Course Info */}
          <div>
            <h1 className="text-5xl font-bold text-primaryText">{courseData.course_name}</h1>
            <p className="text-secondaryText mt-4 text-lg leading-relaxed">
              {courseData.course_description}
            </p>
          </div>
        </div>
      </div>

      {/* Project Section (if exists) */}
      {courseData.project_id && (
        <div className="mb-8 p-6 bg-cardBg rounded-xl shadow-md border border-border">
          <h2 className="text-2xl font-semibold text-primaryText">Course Project</h2>
          <h3 className="text-xl mt-2 font-semibold text-primaryText">{courseData.project_title}</h3>
          <p className="text-secondaryText mt-2">{courseData.project_description}</p>
        </div>
      )}

      {/* Topics Section */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-primaryText">Topics</h2>

        {courseData.topics.map((topic, index) => (
          <div key={topic.topic_id} className="mb-10">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-primaryText">{`${index + 1}. ${topic.topic_name}`}</h3>
              <p className="text-secondaryText mt-1">{topic.topic_description}</p>
            </div>

            {/* Milestones Section */}
            {topic.milestones.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xl font-semibold mb-2 text-primaryText">Milestones</h4>
                <ul className="space-y-3">
                  {topic.milestones.map((milestone) => (
                    <li key={milestone.milestone_id} className="p-4 bg-cardBg rounded-lg shadow-md border border-border">
                      <h5 className="font-bold text-primaryText">{milestone.milestone_title}</h5>
                      <p className="text-secondaryText">{milestone.milestone_description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Assignments Section */}
            {topic.assignments.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xl font-semibold mb-2 text-primaryText">Assignments</h4>
                <ul className="space-y-3">
                  {topic.assignments.map((assignment) => (
                    <li key={assignment.id} className="p-4 bg-cardBg rounded-lg shadow-md border border-border">
                      <h5 className="font-bold text-primaryText">{assignment.title}</h5>
                      <p className="text-secondaryText">{assignment.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Common Mistakes Section */}
            {topic.commonMistakes.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xl font-semibold mb-2 text-primary">Common Mistakes</h4>
                <ul className="space-y-3">
                  {topic.commonMistakes.map((mistake) => (
                    <li key={mistake.mistake_id} className="p-4 bg-primary rounded-lg shadow-md border border-border">
                      <h5 className="font-bold text-white">{mistake.mistake_title}</h5>
                      <p className="text-secondaryText">{mistake.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Code Examples Section */}
            {topic.codeExamples.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xl font-semibold mb-2 text-accent">Code Examples</h4>
                <ul className="space-y-3">
                  {topic.codeExamples.map((example) => (
                    <li key={example.example_id} className="p-4 bg-accent rounded-lg shadow-md border border-border">
                      <h5 className="font-bold text-primaryText">{example.example_title}</h5>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullCoursePage;
