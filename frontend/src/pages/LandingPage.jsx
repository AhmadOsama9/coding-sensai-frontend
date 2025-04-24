import { useNavigate } from "react-router-dom";
import heroImage from "../assets/heroImage.jpeg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 w-full lg:mb-10">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Tech Murim World"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              Welcome to the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Tech Murim World
              </span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-200">
              You can call me{" "}
              <span className="text-purple-400 font-semibold">Great Sensai</span>
            </h2>
            
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-gray-300">
              I shall take you as my disciple
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Begin Your Journey and become a Murim Master in the world of technology
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/login")}
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
              >
                Start Your Journey
              </button>
              
              <button
                onClick={() => navigate("/courses")}
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-purple-400 border-2 border-purple-400 rounded-lg hover:bg-purple-400 hover:text-white transform hover:scale-105 transition-all duration-300"
              >
                Explore Courses
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="w-full max-w-6xl mx-auto mt-12 lg:mt-0 lg:absolute lg:bottom-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 pb-8 lg:pb-0">
            {[
              { title: "Master Technology", desc: "Learn from industry experts" },
              { title: "Practice Projects", desc: "Build real-world applications" },
              { title: "Join Community", desc: "Connect with fellow disciples" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="backdrop-blur-md bg-white/10 p-4 sm:p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;