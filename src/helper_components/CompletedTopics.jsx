import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { 
    getCachedCompletedTopicsData, 
    cacheCompletedTopicsData, 
    incrementCompletedTopicsAccessCount, 
    fetchCompletedTopicsDataFromAPI 
} from '../services/CompletedTopicsService';
import { useAuth } from '../hooks/UseAuth';

const CompletedTopics = () => {
    const [completedTopicsData, setCompletedTopicsData] = useState(null);
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cachedData = getCachedCompletedTopicsData();

                if (cachedData) {
                    setCompletedTopicsData(cachedData.data);
                    incrementCompletedTopicsAccessCount();
                } else {
                    const freshData = await fetchCompletedTopicsDataFromAPI(token);
                    cacheCompletedTopicsData(freshData);
                    setCompletedTopicsData(freshData);
                }
            } catch (err) {
                setError('Failed to fetch completed topics data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) return <p className="text-center text-primary">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!completedTopicsData || completedTopicsData.length === 0) {
    return (
      <div className="container mx-auto my-12 px-6 py-8 bg-cardBg border rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-primary">Completed Topics</h1>
        <p className="text-xl text-gray-700">"Young one, you have yet to begin your journey..."</p>
        <p className="text-lg text-gray-500 mt-6">— The Coding Sensai</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-12 px-6 py-8 bg-cardBg border rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">Completed Topics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {completedTopicsData.map((course, index) => {
          const { course_name, completed_topics, total_topics } = course;
          const percentage = (parseInt(completed_topics, 10) / parseInt(total_topics, 10)) * 100;

          return (
            <div key={index} className="flex flex-col items-center">
              <div style={{ width: 120, height: 120 }}>
                <CircularProgressbar
                  value={percentage}
                  text={`${Math.round(percentage)}%`}
                  styles={buildStyles({
                    pathColor: `rgba(86, 128, 233, ${percentage / 100})`, // Blue tone based on percentage
                    textColor: '#000',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                  })}
                />
              </div>
              <p className="mt-4 font-semibold text-center text-primary">{course_name}</p>
              <p className="text-gray-600">{completed_topics} / {total_topics} topics completed</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompletedTopics;
