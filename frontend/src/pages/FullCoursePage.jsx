import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFullCourseDataWithCache, enrollUserInCourse, updateCachedCourseData } from '../services/FullCourseService';
import { useAuth } from '../hooks/UseAuth';
import CodeExamples from '../page_components/CodeExamples';
import CommonMistakes from '../page_components/CommonMistakes';
import Milestones from '../page_components/Milestones';
import courseImage from "../assets/CodingSensaiProjectCourseImage.png";
import { FaChalkboardTeacher, FaBookOpen, FaLock, FaCheck, FaChevronDown, FaChevronRight, FaLaptopCode, FaExclamationTriangle, FaTasks } from 'react-icons/fa';

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
  const [activeTab, setActiveTab] = useState('overview');

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
    
    // Close assignments when topic is closed
    if (expandedTopics[topicId]) {
      setExpandedAssignments((prev) => ({
        ...prev,
        [topicId]: false,
      }));
    }
  };

  const toggleAssignments = (topicId, e) => {
    e.stopPropagation(); // Prevent triggering the topic toggle
    setExpandedAssignments((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Course</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Course Image */}
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm p-2 flex items-center justify-center flex-shrink-0 border border-white/20 shadow-xl">
              <img
                src={courseImage}
                alt={courseData.course_name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const icon = document.createElement('div');
                  icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>';
                  e.target.parentElement.appendChild(icon);
                }}
              />
            </div>
            
            {/* Course Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{courseData.course_name}</h1>
              <p className="text-purple-200 text-lg mb-6 max-w-2xl">
                {courseData.course_description}
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-4 mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                    <FaBookOpen className="text-purple-200" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-200">Topics</p>
                    <p className="font-bold">{courseData.topics?.length || 0}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                    <FaTasks className="text-purple-200" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-200">Total Milestones</p>
                    <p className="font-bold">{courseData.topics?.reduce((sum, topic) => sum + (topic.milestones?.length || 0), 0) || 0}</p>
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <button
                onClick={handleNavigateStartTheCourse}
                className="px-6 py-3 bg-white text-purple-700 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
              >
                {courseData.is_enrolled ? (
                  <>
                    <FaCheck className="mr-2" /> Continue Learning
                  </>
                ) : (
                  <>
                    <FaLock className="mr-2" /> Start This Course
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Course Overview
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('content')}
            >
              Course Content
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Course Description */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Course</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>{courseData.course_description}</p>
                  {/* Additional course details would go here */}
                </div>
              </div>
              
              {/* What You'll Learn */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">What You'll Learn</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {courseData.topics?.map((topic, index) => (
                    <div key={index} className="flex items-start">
                      <FaChevronRight className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{topic.topic_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Info Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Information</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <span>Total Topics:</span>
                    <span className="font-medium text-gray-900">{courseData.topics?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={`font-medium ${courseData.is_enrolled ? 'text-green-600' : 'text-yellow-600'}`}>
                      {courseData.is_enrolled ? 'Enrolled' : 'Not Started'}
                    </span>
                  </div>
                  {/* Add more course info as needed */}
                </div>
              </div>
              
              {/* Related Courses (placeholder) */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Courses</h3>
                <p className="text-gray-500 text-sm">Explore more courses to enhance your skills</p>
                <button
                  onClick={() => navigate('/courses')}
                  className="mt-4 w-full py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all text-sm font-medium"
                >
                  Browse Courses
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Content</h2>

            {courseData.topics?.map((topic, index) => (
              <div 
                key={topic.topic_id} 
                className="mb-4 bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Topic Header */}
                <div 
                  className={`p-6 cursor-pointer flex items-center justify-between ${
                    expandedTopics[topic.topic_id] ? 'border-b border-gray-200' : ''
                  }`}
                  onClick={() => toggleTopic(topic.topic_id)}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      expandedTopics[topic.topic_id] ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span className="font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{topic.topic_name}</h3>
                      <p className="text-sm text-gray-500">{topic.milestones?.length || 0} milestones</p>
                    </div>
                  </div>
                  <div className={`transition-transform duration-300 ${
                    expandedTopics[topic.topic_id] ? 'rotate-180' : ''
                  }`}>
                    <FaChevronDown className="text-gray-400" />
                  </div>
                </div>

                {/* Topic Content */}
                {expandedTopics[topic.topic_id] && (
                  <div className="p-6 bg-gray-50">
                    <div className="prose max-w-none mb-6 text-gray-700">
                      <p>{topic.topic_description}</p>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-6">
                      {/* Common Mistakes Section */}
                      {topic.commonMistakes && topic.commonMistakes.length > 0 && (
                        <div className="bg-red-50 rounded-lg p-5">
                          <h4 className="flex items-center text-lg font-semibold text-red-700 mb-3">
                            <FaExclamationTriangle className="mr-2" /> Common Mistakes
                          </h4>
                          <CommonMistakes commonMistakes={topic.commonMistakes} />
                        </div>
                      )}

                      {/* Code Examples Section */}
                      {topic.codeExamples && topic.codeExamples.length > 0 && (
                        <div className="bg-indigo-50 rounded-lg p-5">
                          <h4 className="flex items-center text-lg font-semibold text-indigo-700 mb-3">
                            <FaLaptopCode className="mr-2" /> Code Examples
                          </h4>
                          <CodeExamples codeExamples={topic.codeExamples} />
                        </div>
                      )}

                      {/* Assignments Section */}
                      {topic.assignment && (
                        <div className="bg-amber-50 rounded-lg p-5">
                          <h4 
                            className="flex items-center justify-between text-lg font-semibold text-amber-700 mb-3 cursor-pointer"
                            onClick={(e) => toggleAssignments(topic.topic_id, e)}
                          >
                            <span className="flex items-center">
                              <FaTasks className="mr-2" /> Assignment
                            </span>
                            <FaChevronDown className={`transition-transform duration-300 ${
                              expandedAssignments[topic.topic_id] ? 'rotate-180' : ''
                            }`} />
                          </h4>
                          
                          {expandedAssignments[topic.topic_id] && (
                            <div className="mt-3 bg-white p-4 rounded-lg border border-amber-100">
                              <h5 className="font-semibold text-gray-800 mb-2">{topic.assignment.title}</h5>
                              <p className="text-gray-700">{topic.assignment.description}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Milestones Section */}
                      {topic.milestones && topic.milestones.length > 0 && (
                        <div className="bg-green-50 rounded-lg p-5">
                          <h4 className="flex items-center text-lg font-semibold text-green-700 mb-3">
                            <FaCheck className="mr-2" /> Milestones
                          </h4>
                          <Milestones milestones={topic.milestones} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FullCoursePage;