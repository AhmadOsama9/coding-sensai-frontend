import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import loginPage from "../assets/loginPage.jpeg";

const GOOGLE_LOGIN_URL = "http://localhost:4000/api/user/auth/google";
const GITHUB_LOGIN_URL = "http://localhost:4000/api/user/auth/github";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };

  const handleGithubLogin = () => {
    window.location.href = GITHUB_LOGIN_URL;
  };

  return (
    <div className="flex min-h-screen items-center justify-center relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={loginPage}
          alt="Murim Sect Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/70 to-gray-900/80 backdrop-blur-sm"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/20">
          {/* Card Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border-b border-white/10">
            <h1 className="text-3xl font-bold text-white text-center">
              Welcome Back
            </h1>
            <p className="mt-2 text-center text-purple-200">
              Join the Tech Murim World
            </p>
          </div>
          
          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center text-white/80 mb-2">
              <p>Choose your preferred login method</p>
            </div>

            {/* Login Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg shadow-lg bg-white text-gray-800 hover:bg-gray-100 transition duration-300 transform hover:scale-[1.02]"
              >
                <FcGoogle className="text-xl" />
                <span className="font-medium">Continue with Google</span>
              </button>
              
              <button
                onClick={handleGithubLogin}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg shadow-lg bg-gray-800 text-white hover:bg-gray-900 transition duration-300 transform hover:scale-[1.02]"
              >
                <FaGithub className="text-xl" />
                <span className="font-medium">Continue with GitHub</span>
              </button>
            </div>
            
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-purple-900/50 text-white/60 backdrop-blur-sm rounded">
                  Secure Authentication
                </span>
              </div>
            </div>
            
            {/* Footer Note */}
            <p className="text-center text-white/60 text-sm">
              By logging in, you agree to our 
              <a href="/terms" className="text-purple-300 hover:text-purple-200 ml-1">
                Terms of Service
              </a> and 
              <a href="/privacy" className="text-purple-300 hover:text-purple-200 ml-1">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-32 w-32 bg-purple-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 h-32 w-32 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
    </div>
  );
};

export default LoginPage;