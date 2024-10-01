import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navLinks } from '../constants';
import { useAuth } from '../hooks/UseAuth';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import logo from "../assets/logo.png";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, setToken, username, imageUrl } = useAuth();
  const currentPath = location.pathname;
  const [toggle, setToggle] = useState(false);

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  const getVisibleLinks = () => {
    return navLinks.filter(link => {
      if (link.visibility === 'always') return true;
      if (link.visibility === 'loggedIn' && token) return true;
      if (link.visibility === 'loggedOut' && !token) return true;
      return false;
    });
  };

  return (
    <>
      {/* Hamburger menu button for small screens */}
      <div className="md:hidden flex justify-between items-center p-4 bg-background">
        <Link to="/">
          <img src={logo} alt="Logo" width={120} height={20} />
        </Link>
        <button onClick={() => setToggle(!toggle)}>
          {toggle ? <FaTimes size={28} className="text-white" /> : <FaBars size={28} className="text-white" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`md:block ${toggle ? 'block' : 'hidden'} top-0 left-0 min-w-52 h-screen bg-background fixed z-50 drop-shadow-2xl text-muted flex flex-col justify-between`}>
        <div className="flex flex-col justify-between h-full">
          {/* Top Section */}
          <div>
            <Link to="/" className="flex items-center justify-center py-4">
              <img src={logo} alt="Logo" width={180} height={28} />
            </Link>

            {/* Navigation Links */}
            <nav className="flex flex-col">
              <ul className="space-y-4">
                {getVisibleLinks().map(link => {
                  const isActive = link.route === currentPath;
                  const IconComponent = link.icon;

                  return (
                    <li key={link.route} className={`group p-4 ${isActive ? 'bg-primary text-white' : 'text-primaryText hover:text-secondary'}`}>
                      <Link to={link.route} className="flex items-center gap-2" onClick={() => setToggle(false)}>
                        <IconComponent size={24} className={`${isActive ? 'text-secondary' : 'text-primary'}`} />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="py-2">
            {token ? (
              <div className="flex flex-col gap-2 m-4">
                <div className="flex items-center gap-4">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="User Profile"
                      className="w-10 h-10 rounded-full object-cover"
                      loading='lazy'
                    />
                  ) : (
                    <FaUserCircle size={32} className="text-muted" />
                  )}
                  <span className="text-sm text-primary">{username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-primary hover:bg-hoverPrimary text-white px-4 py-2 rounded transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primary text-white w-8/12 py-2 ml-8 rounded-3xl hover:bg-hoverPrimary flex items-center justify-center text-lg">
                  Join the Sect
                </button>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
