import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import { CourseProvider } from './context/CourseContext.jsx'
import { UserCourseProvider } from './context/CourseUserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <CourseProvider>
          <UserCourseProvider>
            <App />
          </UserCourseProvider>
        </CourseProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
)
