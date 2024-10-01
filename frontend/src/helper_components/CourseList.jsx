import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourse } from '../hooks/UseCourse';

const CourseList = ({ courses }) => {
  const navigate = useNavigate();
  const { setSelectedCourse } = useCourse();

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    navigate(`/course-overview/${course.id}`, { state: { course } });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-24 text-secondaryText">
      {courses.map((course) => (
        <div 
          key={course.id} 
          className="course-card border rounded-xl p-4 bg-cardBg hover:bg-background cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
          onClick={() => handleCourseClick(course)}
        >
          <img
            src={course.img_url} 
            alt={course.name}
            className="w-full h-48 object-cover mb-4 rounded"
            loading='lazy'
          />
          <h2 className="text-xl font-bold mb-2 text-primaryText">{course.name}</h2>
          <p className="text-muted mb-4">{course.description}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Topics: {course.topics}</h3>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Tracks:</h3>
            <ul className="list-none ml-0 flex flex-wrap">
              {course.tracks.map((track, index) => (
                <li key={index} className="bg-accent text-primaryText px-2 py-1 rounded mr-2 mb-2">
                  {track.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
