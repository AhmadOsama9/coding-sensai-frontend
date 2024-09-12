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
    <>
      <div className="flex min-h-screen items-center justify-center text-primaryText bg-cover bg-center bg-no-repeat relative">
        <img
          src={loginPage}
          alt="Murim Sect"
          className="absolute inset-0 w-full h-full lg:object -z-10"
        />
        <img
          src={loginPage}
          alt="Murim Sect"
          className="absolute inset-0 w-full h-full lg:object custom-blur"
        />
        <div className="absolute inset-0 bg-background bg-opacity-60"></div> {/* Soft overlay */}

        <div className="flex flex-col w-fit max-w-2xl sm:p-16 p-8 shadow-lg rounded-3xl bg-gradient-to-tr from-primary to-hoverPrimary items-center justify-center z-0 outline outline-1 outline-border">
          <h1 className="text-2xl font-semibold text-center text-primaryText mb-6">
            Login
          </h1>
          <div className="space-y-4 flex flex-col sm:flex-row">
            <button
              onClick={handleGoogleLogin}
              className="w-full min-w-fit max-w-md flex items-center justify-center gap-3 py-2 px-4 border border-muted rounded-lg shadow-sm bg-cardBg text-secondaryText hover:bg-hoverPrimary hover:text-white transition ease-in-out duration-150 mt-4"
            >
              <FcGoogle className="text-xl" />
              <span className="font-medium">Login with Google</span>
            </button>
            <button
              onClick={handleGithubLogin}
              className="w-full min-w-fit flex items-center justify-center gap-3 py-2 px-4 rounded-lg shadow-sm bg-secondary text-white hover:bg-transparent hover:text-muted border border-muted focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition ease-in-out duration-150 lg:ml-4"
            >
              <FaGithub className="text-xl" />
              <span className="font-medium">Login with GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
