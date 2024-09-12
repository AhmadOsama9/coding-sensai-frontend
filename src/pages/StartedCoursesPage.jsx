import { useEffect, useState } from "react";
import { fetchStartedCoursesWithCache } from "../services/StartedCourses";
import { useAuth } from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";

const StartedCoursesPage = () => {

    const [ courseData, setCourseData ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
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

  const handleNavigateStartTheCourse = () => {
    navigate("/courses");
    };

  if (loading) return <div className="text-center text-lg text-primary">Loading...</div>;
  if (error) return <div className="text-center text-errorRed">Error: {error}</div>;
    
  if (courseData && courseData.length === 0) {
      return (
        <div className="text-center text-lg text-secondaryText">
          <p>You haven't started any courses yet.</p>
          <button
            onClick={handleNavigateStartTheCourse}
            className="mt-4 bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            View All Courses
          </button>
        </div>
      );
  }

 return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Started Courses</h1>
      <div>
        {courseData && courseData.map((course) => (
          <div 
            key={course.course_id} 
            className="flex items-center justify-between bg-cardBg rounded-lg shadow-md p-6 mb-6"
          >
            <div>
              <h2 className="text-xl font-bold text-primary">{course.course_name}</h2>
              <p className="text-lg text-secondaryText">{course.course_description}</p>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryDark">
              Continue
            </button>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default StartedCoursesPage
