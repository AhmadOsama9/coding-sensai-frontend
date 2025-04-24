import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseOverviewWithCache } from '../services/CourseOverviewService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';
import { FaLock, FaCheckCircle, FaClock, FaChalkboardTeacher, FaChevronRight } from 'react-icons/fa';
import courseImage from "../assets/CodingSensaiProjectCourseImage.png";


const CourseOverviewPage = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseOverview = async () => {
      try {
        const data = await fetchCourseOverviewWithCache(courseId);
        setCourseData(data);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <p className="text-gray-700 mb-6">We couldn't find the course you're looking for.</p>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
          >
            Browse All Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section with Course Image */}
      <div className="relative">
          <div className="h-72 md:h-96 w-full bg-gray-300">
              {courseData.course.course_img_url ? (
                  <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-purple-700 to-indigo-800">
                      <img
                          src={courseImage} 
                          alt={courseData.course.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                              const icon = document.createElement('div');
                              icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>';
                              e.target.parentElement.appendChild(icon);
                          }}
                      />
                  </div>
              ) : (
                  <div className="w-full h-full bg-gradient-to-r from-purple-700 to-indigo-800 flex items-center justify-center">
                      <FaChalkboardTeacher className="text-white text-6xl" />
                  </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          {/* Course Title Overlay - keep as is */}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        {/* Action Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-600 text-lg mb-1">Ready to start your journey?</p>
            <p className="text-gray-500">Get full access to all course materials and projects</p>
          </div>
          
          {token ? (
            <button
              onClick={handleShowFullDetails}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-8 rounded-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2"
            >
              Access Course <FaChevronRight />
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-8 rounded-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2"
            >
              <FaLock className="mr-2" /> Login to Access
            </button>
          )}
        </div>

        {/* Course Description */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-4">
            About This Course
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {courseData.course.description}
          </p>
          
          {/* Course Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="flex items-start">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <FaClock className="text-purple-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Self-paced Learning</h3>
                <p className="text-gray-600 text-sm">Learn at your own speed</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                <FaCheckCircle className="text-indigo-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Hands-on Projects</h3>
                <p className="text-gray-600 text-sm">Apply your knowledge in real scenarios</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <FaChalkboardTeacher className="text-purple-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Expert Instruction</h3>
                <p className="text-gray-600 text-sm">Learn from the Great Sensai</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Topics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
            Course Topics
          </h2>
          <ul className="space-y-4">
            {courseData.topics.map((topic, index) => (
              <li key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-100 hover:border-purple-200 transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{topic.topic_name}</h3>
                    <p className="text-gray-600 mb-3">{topic.topic_description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
                        {topic.milestone_count} Milestones
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    <FaChevronRight />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseOverviewPage;