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
import { FaBook } from 'react-icons/fa';

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

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="text-center py-6">
                <p className="text-red-500">{error}</p>
                <button 
                    onClick={() => fetchCompletedTopicsDataFromAPI(token)}
                    className="mt-3 text-sm text-purple-600 hover:text-purple-800"
                >
                    Try again
                </button>
            </div>
        );
    }

    if (!completedTopicsData || completedTopicsData.length === 0) {
        return (
            <div className="text-center py-8 px-4">
                <div className="bg-purple-50 p-4 rounded-lg inline-block mb-4">
                    <FaBook className="text-purple-500 text-2xl mx-auto" />
                </div>
                <p className="text-lg text-gray-700 font-medium mb-2">"Young one, you have yet to begin your journey..."</p>
                <p className="text-sm text-gray-500">— The Coding Sensai</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {completedTopicsData.map((course, index) => {
                const { course_name, completed_topics, total_topics } = course;
                const percentage = (parseInt(completed_topics, 10) / parseInt(total_topics, 10)) * 100;
                let progressColor;
                
                if (percentage < 30) progressColor = '#9333ea'; // purple-600
                else if (percentage < 70) progressColor = '#6366f1'; // indigo-500
                else progressColor = '#22c55e'; // green-500

                return (
                    <div key={index} className="mb-4 last:mb-0">
                        <div className="flex items-center mb-1">
                            <h3 className="text-gray-800 font-medium flex-1 truncate" title={course_name}>
                                {course_name}
                            </h3>
                            <span className="text-sm text-gray-500">
                                {completed_topics}/{total_topics}
                            </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                className="h-2.5 rounded-full transition-all duration-500"
                                style={{
                                    width: `${percentage}%`, 
                                    backgroundColor: progressColor
                                }}
                            ></div>
                        </div>
                        
                        <div className="mt-1 flex justify-between items-center text-xs text-gray-500">
                            <span>{Math.round(percentage)}% complete</span>
                            {percentage === 100 && (
                                <span className="text-green-500 font-medium">Completed!</span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CompletedTopics;