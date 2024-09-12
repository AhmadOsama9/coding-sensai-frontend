import { useAuth } from "../hooks/UseAuth";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import pic1 from "../assets/logo.png";

const Navbar = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current route

  const handleLogout = () => {
    setToken(null); // Clear the token
    navigate('/login'); // Redirect to the login page
  };

  // Check if the user is on the login page
  const isOnLoginPage = location.pathname === '/login';

  return (
    <div className="h-16 bg-[#181d23] text-white drop-shadow-2xl fixed top-0 left-0 w-full z-50" style={{opacity: '0.96'}}>
      <div className="flex justify-between items-center h-full px-4">
        <Link to="/">
          <img src={pic1} alt="logo" className="h-16" />
        </Link>

        <div>
          <Link to="/" className="text-lg font-semibold hover:text-red-500 transition duration-300 mr-4"> Home </Link>
          <Link to="/pricing" className="text-lg font-semibold hover:text-red-500 transition duration-300 mr-4"> Pricing </Link>
        </div>

        <div className="flex items-center space-x-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Logout
            </button>
          ) : (
            !isOnLoginPage && (
              <Link to="/login">
                <button className="bg-[#af0026] text-white w-36 h-9 px- py-2 rounded-3xl hover:bg-red-800 flex items-center justify-center text-lg">
                  Join the Sect
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
