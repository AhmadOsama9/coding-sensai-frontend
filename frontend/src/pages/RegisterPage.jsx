import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const GOOGLE_LOGIN_URL = "http://localhost:4000/api/user/auth/google";
const GITHUB_LOGIN_URL = "http://localhost:4000/api/user/auth/github";

// const naviagate = useNavigate();

const RegisterPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };

  const handleGithubLogin = () => {
    window.location.href = GITHUB_LOGIN_URL;
  };

  return (
    
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h1>
        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150"
          >
            <FcGoogle className="text-xl" />
            <span className="font-medium">Login with Google</span>
          </button>
          <button
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition ease-in-out duration-150"
          >
            <FaGithub className="text-xl" />
            <span className="font-medium">Login with GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
