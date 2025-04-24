import React, { useState, useEffect } from 'react';
import CourseList from '../helper_components/CourseList';
import Filter from '../helper_components/Filter';
import SearchBar from '../helper_components/SearchBar';
import { useAuth } from '../hooks/UseAuth';
import { fetchCoursesWithCache } from '../services/CourseService';
import { FaGraduationCap, FaFilter } from 'react-icons/fa';

function CoursePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTrack, setFilterTrack] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const fetchedCourses = await fetchCoursesWithCache(token);
        setCourses(fetchedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    
    return () => {
      setSearchTerm('');
      setFilterTrack('');
    };
  }, [token]);

  const filteredCourses = courses.filter((course) => {
    return (
      (filterTrack === '' || course.tracks.some(track => track.name === filterTrack)) &&
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Get unique tracks from all courses
  const allTracks = [...new Set(courses.flatMap(course => 
    course.tracks.map(track => track.name)
  ))];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0 lg:mr-8 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Explore Our <span className="text-purple-300">Curated Courses</span>
              </h1>
              <p className="text-lg text-purple-100 max-w-2xl">
                Master the art of coding with our comprehensive curriculum designed by industry experts
              </p>
            </div>
            <div className="flex-shrink-0 bg-white/10 backdrop-blur-md p-6 rounded-lg border border-purple-500/30 hidden md:block">
              <FaGraduationCap className="h-20 w-20 text-purple-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <div className="flex flex-col space-y-6">
            <div className="w-full">
              <SearchBar onSearch={setSearchTerm} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="hidden md:block">
                <Filter
                  onFilterChange={setFilterTrack}
                  tracks={allTracks}
                  activeTrack={filterTrack}
                />
              </div>
              
              <button 
                className="md:hidden flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter className="mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              <div className="text-gray-500 text-sm">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
              </div>
            </div>
            
            {/* Mobile filters */}
            {showFilters && (
              <div className="md:hidden">
                <Filter
                  onFilterChange={setFilterTrack}
                  tracks={allTracks}
                  activeTrack={filterTrack}
                />
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredCourses.length > 0 ? (
          <CourseList courses={filteredCourses} />
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <h3 className="text-xl text-gray-600">No courses found matching your criteria</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter</p>
            <button 
              onClick={() => {setSearchTerm(''); setFilterTrack('');}}
              className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursePage;