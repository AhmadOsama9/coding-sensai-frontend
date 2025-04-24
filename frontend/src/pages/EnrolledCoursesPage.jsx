import { useEffect, useState } from "react";
import { fetchStartedCoursesWithCache } from "../services/StartedCourses";
import { useAuth } from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import { FaBook, FaArrowRight, FaRegClock, FaChalkboardTeacher } from "react-icons/fa";
// Import the image directly
import courseImage from "../assets/CodingSensaiProjectCourseImage.png";

const StartedCoursesPage = () => {
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStartedCourses = async () => {
            try {
                const data = await fetchStartedCoursesWithCache(token);
                setCourseData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStartedCourses();
    }, [token]);

    const handleNavigateToAllCourses = () => {
        navigate("/courses");
    };

    const handleContinueCourse = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Courses</h2>
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

    if (!courseData || courseData.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                    <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                        <FaBook className="text-purple-600 text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">No Courses Started Yet</h2>
                    <p className="text-gray-600 mb-6">Embark on your learning journey by exploring our courses and beginning your path to mastery.</p>
                    <button
                        onClick={handleNavigateToAllCourses}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center mx-auto"
                    >
                        Explore All Courses <FaArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Your Learning Journey
                    </h1>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Continue where you left off and progress on your path to mastery
                    </p>
                </div>

                {/* Course Cards */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {courseData.map((course) => (
                        <div 
                            key={course.course_id} 
                            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                        >
                            {/* Course Image - UPDATED to use the local image */}
                            <div className="h-48 overflow-hidden relative bg-gray-100 flex items-center justify-center">
                              <img 
                                  src={courseImage} 
                                  alt={course.course_name} 
                                  className="w-auto h-full object-contain max-w-full"
                              />
                                
                                {/* Progress Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white px-4 py-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span>Progress</span>
                                        <span>{course.progress || 0}%</span>
                                    </div>
                                    <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
                                        <div 
                                            className="bg-purple-500 h-2 rounded-full"
                                            style={{ width: `${course.progress || 0}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Course Content */}
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{course.course_name}</h2>
                                
                                {course.description && (
                                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">{course.description}</p>
                                )}
                                
                                {/* Last Activity */}
                                <div className="flex items-center text-sm text-gray-500 mb-6">
                                    <FaRegClock className="mr-2" />
                                    <span>
                                        Last activity: {course.last_activity_date ? 
                                            new Date(course.last_activity_date).toLocaleDateString() :
                                            'Not started yet'
                                        }
                                    </span>
                                </div>
                                
                                {/* Action Button */}
                                <button
                                    onClick={() => handleContinueCourse(course.course_id)}
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center"
                                >
                                    Continue Learning <FaArrowRight className="ml-2" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* View More Courses Button */}
                <div className="mt-12 text-center">
                    <button
                        onClick={handleNavigateToAllCourses}
                        className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all"
                    >
                        Explore More Courses
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartedCoursesPage;