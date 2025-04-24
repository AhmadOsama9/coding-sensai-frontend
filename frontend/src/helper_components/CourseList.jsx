import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourse } from '../hooks/UseCourse';
import { FaClock, FaCode, FaChalkboardTeacher } from 'react-icons/fa';
import courseImage from "../assets/CodingSensaiProjectCourseImage.png";

const CourseList = ({ courses }) => {
  const navigate = useNavigate();
  const { setSelectedCourse } = useCourse();

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    navigate(`/course-overview/${course.id}`, { state: { course } });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div 
          key={course.id} 
          className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
          onClick={() => handleCourseClick(course)}
        >
          {course.img_url ? (
            <img
              src={courseImage} 
              alt={course.name}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          ) : (
            <div className="h-48 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <FaChalkboardTeacher className="text-white text-5xl" />
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{course.name}</h2>
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                {course.topics} Topics
              </span>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">{course.description}</p>
            
            <div className="mt-6 border-t border-gray-100 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Tracks:</h3>
              <div className="flex flex-wrap gap-2">
                {course.tracks.map((track, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full"
                  >
                    {track.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 py-3 px-6 border-t border-gray-100 flex justify-between items-center">
            <div className="flex items-center text-gray-500 text-xs">
              <FaCode className="mr-1" /> 
              <span>Hands-on Projects</span>
            </div>
            <div className="flex items-center text-gray-500 text-xs">
              <FaClock className="mr-1" />
              <span>Learn at your pace</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;