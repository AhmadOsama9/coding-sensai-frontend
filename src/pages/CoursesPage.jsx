import React, { useState, useEffect } from 'react';
import CourseList from '../helper_components/CourseList';
import Filter from '../helper_components/Filter';
import SearchBar from '../helper_components/SearchBar';
import { useAuth } from '../hooks/UseAuth';
import { fetchCoursesWithCache } from '../services/CourseService';

function CoursePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTrack, setFilterTrack] = useState('');
  const [courses, setCourses] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await fetchCoursesWithCache(token);
        setCourses(fetchedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [token]);

  // So to go back can't we add something to the useEffect and we will make it being
  // Affected when we go back to the course page it will remount

  const filteredCourses = courses.filter((course) => {
    return (
      (filterTrack === '' || course.tracks.some(track => track.name === filterTrack)) &&
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex bg-background min-h-screen">
      <div className="flex-1 p-8">
        <SearchBar onSearch={setSearchTerm} />
        <Filter
          onFilterChange={setFilterTrack}
          tracks={courses.flatMap(course => course.tracks.map(track => track.name))}
          activeTrack={filterTrack}
        />
        <CourseList courses={filteredCourses} />
      </div>
    </div>
  );
}

export default CoursePage;
