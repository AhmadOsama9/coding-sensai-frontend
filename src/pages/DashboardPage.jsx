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
import { FaFire, FaMedal, FaCalendarAlt, FaTrophy } from 'react-icons/fa'; // Icons from react-icons
import CompletedTopics from '../helper_components/CompletedTopics';
import Leaderboard from '../helper_components/Leaderboard';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const { username, token } = useAuth();
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

    if (loading) return <p className="text-center text-primaryText">Loading...</p>;
    if (error) return <p className="text-center text-primary">{error}</p>;
    
    return (
      <div className="container mx-auto my-12 px-6 py-8 bg-cardBg border border-muted rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-primaryText">User Dashboard</h1>
        <h2 className="text-xl mb-6 text-center text-primaryText">Welcome, {username}</h2>
    
        {dashboardData && (
          <div>
            {/* Display points, streak, and last login */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <FaTrophy className="text-accent text-2xl mr-2" />
                <p className="text-lg font-semibold text-primaryText">
                  Total Points:
                  <span className="ml-2 text-primary">{dashboardData.total_points}</span>
                </p>
              </div>
    
              <div className="flex items-center">
                <FaFire className="text-primary text-2xl mr-2" />
                <p className="text-lg font-semibold text-primaryText">
                  Current Streak:
                  <span className="ml-2 text-success">{dashboardData.current_streak} days</span>
                </p>
              </div>
    
              <div className="flex items-center">
                <FaMedal className="text-purple-500 text-2xl mr-2" />
                <p className="text-lg font-semibold text-primaryText">
                  Max Streak:
                  <span className="ml-2 text-warning">{dashboardData.max_streak} days</span>
                </p>
              </div>
    
              <div className="flex items-center">
                <FaCalendarAlt className="text-info text-2xl mr-2" />
                <p className="text-lg font-semibold text-primaryText">
                  Last Login:
                  <span className="ml-2 text-muted">
                    {new Date(dashboardData.last_login_date).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
    
            {/* Heatmap Section */}
            <div className="my-8">
              <Heatmap data={dashboardData.daily_points} />
              
              {/* Leaderboard with top users and their profile images */}
              <Leaderboard topUsers={dashboardData.top_users} />
              
              <CompletedTopics />
            </div>
          </div>
        )}
      </div>
    );
    
};

export default Dashboard;
