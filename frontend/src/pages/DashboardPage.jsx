import React, { useState, useEffect } from 'react';
import { 
    getCachedDashboardData, 
    cacheDashboardData, 
    incrementDashboardAccessCount, 
    fetchDashboardDataFromAPI 
} from '../services/DashboardService';
import { logUserActivityOncePerDay } from '../services/LoggingService';
import Heatmap from '../helper_components/Heatmap';
import { useAuth } from '../hooks/UseAuth';
import { FaFire, FaMedal, FaCalendarAlt, FaTrophy, FaChartLine } from 'react-icons/fa';
import CompletedTopics from '../helper_components/CompletedTopics';
import Leaderboard from '../helper_components/Leaderboard';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const { username, imageUrl, token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await logUserActivityOncePerDay(token);

                const cachedData = getCachedDashboardData();

                if (cachedData) {
                    setDashboardData(cachedData.data);
                    incrementDashboardAccessCount();
                } else {
                    const freshData = await fetchDashboardDataFromAPI(token);
                    cacheDashboardData(freshData);
                    setDashboardData(freshData);
                }
            } catch (err) {
                setError('Failed to fetch dashboard data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

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
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            {/* Welcome Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="px-6 py-8 sm:p-10 sm:pb-6">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                                <div className="flex-shrink-0">
                                    {imageUrl ? (
                                        <img 
                                            src={imageUrl} 
                                            alt={username} 
                                            className="h-16 w-16 rounded-full border-2 border-white"
                                        />
                                    ) : (
                                        <div className="h-16 w-16 rounded-full bg-purple-400 flex items-center justify-center text-white text-2xl font-bold">
                                            {username ? username.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                    )}
                                </div>
                                <div className="ml-4">
                                    <h1 className="text-2xl font-bold text-white">Welcome, {username}</h1>
                                    <p className="text-purple-200">Your learning journey awaits</p>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md py-2 px-4 rounded-lg">
                                <div className="flex items-center">
                                    <FaTrophy className="text-yellow-300 text-2xl mr-2" />
                                    <div>
                                        <p className="text-purple-200 text-sm">Total Points</p>
                                        <p className="text-white text-2xl font-bold">{dashboardData.total_points}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <FaFire className="text-purple-600 text-xl" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-500 font-medium">Current Streak</p>
                                    <p className="text-3xl font-bold text-gray-900">{dashboardData.current_streak} days</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-purple-50 px-6 py-3">
                            <div className="flex items-center">
                                <FaChartLine className="text-purple-500 text-sm mr-2" />
                                <p className="text-xs text-purple-600 font-medium">
                                    {dashboardData.current_streak > 0 ? "Keep it going!" : "Start your streak today"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="bg-indigo-100 p-3 rounded-lg">
                                    <FaMedal className="text-indigo-600 text-xl" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-500 font-medium">Max Streak</p>
                                    <p className="text-3xl font-bold text-gray-900">{dashboardData.max_streak} days</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-indigo-50 px-6 py-3">
                            <div className="flex items-center">
                                <FaChartLine className="text-indigo-500 text-sm mr-2" />
                                <p className="text-xs text-indigo-600 font-medium">
                                    {dashboardData.current_streak >= dashboardData.max_streak && dashboardData.max_streak > 0 
                                        ? "You're at your best!" 
                                        : "Keep pushing to beat your record"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <FaCalendarAlt className="text-blue-600 text-xl" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-500 font-medium">Last Login</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {new Date(dashboardData.last_login_date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-blue-50 px-6 py-3">
                            <div className="flex items-center">
                                <FaChartLine className="text-blue-500 text-sm mr-2" />
                                <p className="text-xs text-blue-600 font-medium">
                                    Daily practice leads to mastery
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Heatmap */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Your Activity</h2>
                    <Heatmap data={dashboardData.daily_points} />
                </div>

                {/* Two-column layout for leaderboard and completed topics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <FaTrophy className="text-yellow-500 mr-2" />
                            Leaderboard
                        </h2>
                        <Leaderboard topUsers={dashboardData.top_users} />
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <FaMedal className="text-purple-500 mr-2" />
                            Completed Topics
                        </h2>
                        <CompletedTopics />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;