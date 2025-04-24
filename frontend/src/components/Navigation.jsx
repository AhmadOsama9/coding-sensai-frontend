import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navLinks } from '../constants';
import { useAuth } from '../hooks/UseAuth';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import logo from "../assets/logo.png";

const Navigation = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, setToken, username, imageUrl, role } = useAuth();
  const currentPath = location.pathname;
  const isOnLoginPage = location.pathname === '/login';

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  // Separate main navigation links for horizontal navbar
  const mainNavLinks = [
    { label: 'Home', route: '/' },
    { label: 'Courses', route: '/courses' },
    { label: 'Pricing', route: '/pricing' }
  ];

  // Filter sidebar navigation links based on user role and authentication status
  const getSidebarLinks = () => {
    return navLinks.filter(link => {
      if (link.visibility === 'always') return true;
      if (link.visibility === 'loggedIn' && token) return true;
      if (link.visibility === 'loggedOut' && !token) return true;
      if (link.visibility === 'admin' && role === 'admin') return true;
      return false;
    });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white z-50 border-b border-gray-700">
        <div className="h-full px-4 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleSidebar}
              aria-label="Toggle menu"
              className="lg:hidden text-gray-300 hover:text-white"
            >
              <FaBars size={24} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="logo" className="h-10" />
            </Link>
          </div>

          {/* Desktop Navigation Links
          <div className="hidden lg:flex items-center space-x-6">
            {mainNavLinks.map((link) => (
              <Link 
                key={link.route} 
                to={link.route} 
                className={`nav-link ${currentPath === link.route ? 'text-purple-300 font-semibold' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div> */}

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {token ? (
              <div className="flex items-center gap-2">
                {imageUrl && (
                  <img src={imageUrl} alt={username} className="w-8 h-8 rounded-full hidden sm:block" />
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              !isOnLoginPage && (
                <Link to="/login">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300 text-sm">
                    Join Now
                  </button>
                </Link>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:z-30 pt-16
      `}>
        {/* Close button - Mobile only */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden absolute right-4 top-4 text-gray-400 hover:text-white"
          aria-label="Close menu"
        >
          <FaTimes size={24} />
        </button>

        {/* Navigation Links */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {/* Only on mobile: show main navigation links
            <div className="lg:hidden">
              {mainNavLinks.map((link) => (
                <li key={`mobile-${link.route}`}>
                  <Link
                    to={link.route}
                    onClick={toggleSidebar}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                      ${currentPath === link.route
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }
                    `}
                  >
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              ))}
              
              {/* Divider for mobile only */}
              {/* <li className="my-3 border-b border-gray-700"></li> */}
            {/* </div> */}
            
            {/* Sidebar specific links */}
            {getSidebarLinks().map(link => {
              const isActive = link.route === currentPath;
              const IconComponent = link.icon;

              return (
                <li key={link.route}>
                  <Link
                    to={link.route}
                    onClick={() => {
                      // Close sidebar on mobile when clicked
                      if (window.innerWidth < 1024) toggleSidebar();
                    }}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                      ${isActive 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }
                    `}
                  >
                    {IconComponent && <IconComponent size={20} />}
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          {token && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {imageUrl ? (
                  <img src={imageUrl} alt={username} className="w-10 h-10 rounded-full" />
                ) : (
                  <FaUserCircle size={40} className="text-gray-400" />
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{username}</span>
                  <span className="text-xs text-gray-400">
                    {role === 'admin' ? 'Administrator' : 'Student'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navigation;