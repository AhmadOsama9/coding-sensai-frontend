import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/DashboardPage';
import AuthCallback from './components/AuthCallback';
import { useAuth } from './hooks/UseAuth';
import Navigation from './components/Navigation';
import PaymentCallback from './components/PaymentCallback';
import PricingPage from './pages/PricingPage';
import TermsOfService from './necessary_pages/TermsOfService';
import PrivacyNotice from './necessary_pages/PrivacyNotice';
import RefundPolicy from './necessary_pages/RefundPolicy';
import Footer from './components/Footer';
import Courses from './pages/CoursesPage';
import CourseOverviewPage from './pages/CourseOverviewPage';
import FullCoursePage from './pages/FullCoursePage';
import FullUserCoursePage from './pages/UserFullCoursePage';
import EnrolledCoursesPage from './pages/EnrolledCoursesPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashBoard from './pages/AdminDashBoard';

const App = () => {
  const { token, role } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      
      <main className={`
        min-h-screen transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'}
      `}>
        <div className="pt-16"> {/* For navbar height */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/login" 
              element={token ? <Navigate to="/dashboard" /> : <LoginPage />} 
            />
            <Route path="/admin/login" element={token ? <Navigate to="/" /> : <AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={role === "admin" ? <AdminDashBoard /> : <Navigate to="/admin/login" />} 
            />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route 
              path="/payment/redirection" 
              element={token ? <PaymentCallback /> : <Navigate to="/login" />} 
            />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyNotice />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course-overview/:courseId" element={<CourseOverviewPage />} />

            {/* Protected Routes */}
            <Route 
              path="/full-course/:courseId" 
              element={token ? <FullCoursePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/user/full-course/:courseId" 
              element={token ? <FullUserCoursePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/user/started-courses" 
              element={token ? <EnrolledCoursesPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard" 
              element={token ? <Dashboard /> : <Navigate to="/login" />} 
            />
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default App;