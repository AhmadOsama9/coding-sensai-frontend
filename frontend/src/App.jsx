import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/DashboardPage';
import AuthCallback from './components/AuthCallback';
import { useAuth } from './hooks/UseAuth';
import Navbar from './components/Navbar';
import PaymentCallback from './components/PaymentCallback';
import PricingPage from './pages/PricingPage';
import TermsOfService from './necessary_pages/TermsOfService';
import PrivacyNotice from './necessary_pages/PrivacyNotice';
import RefundPolicy from './necessary_pages/RefundPolicy';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Courses from './pages/CoursesPage';
import CourseOverviewPage from './pages/CourseOverviewPage';
import FullCoursePage from './pages/FullCoursePage';
import FullUserCoursePage from './pages/UserFullCoursePage';
import EnrolledCoursesPage from './pages/EnrolledCoursesPage';

const App = () => {
  const { token } = useAuth();

  return (
    <>
      {/* <Navbar /> */}
      <Sidebar />
      <div className="md:ml-52 pb-16 sm:pb-12 md:pb-8 lg:pb-4"> {/* Adjust the midth of the sidebar */}
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/login" 
            element={token ? <Navigate to="/dashboard" /> : <LoginPage />} 
          />
          <Route 
            path="/register" 
            element={token ? <Navigate to="/dashboard" /> : <RegisterPage />} 
          />
          <Route path="/auth/callback" element={<AuthCallback />} />

          <Route 
            path="/payment/redirection" 
            element={token ? <PaymentCallback /> : <LoginPage />} 
          />

          <Route path="/pricing" element={<PricingPage />} />

          <Route path="/terms" element={<TermsOfService />} />

          <Route path="/privacy" element={<PrivacyNotice />} />

          <Route path="/refund" element={<RefundPolicy />} />

          <Route path="/courses" element={<Courses />} />

          <Route path="/course-overview/:courseId" element={<CourseOverviewPage />} />

          <Route path="/full-course/:courseId" element={<FullCoursePage />} />

          <Route path="/user/full-course/:courseId" element={<FullUserCoursePage />} />

          <Route path="/user/started-courses" element={<EnrolledCoursesPage />} />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={token ? <Dashboard /> : <Navigate to="/login" />} 
          />
          
          {/* Redirect any unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

      </div>

      <div>
        <Footer />
      </div>
      
    </>
  );
};

export default App;
