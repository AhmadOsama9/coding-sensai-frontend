import { useNavigate } from "react-router-dom";
import heroImage from "../assets/heroImage.jpeg";
import lgHeroImage from "../assets/heroImageLg.jpg";
import Navbar from "../components/Navbar";
import Navbar_vertical from "../components/Sidebar";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="flex">  

        {/* Hero Section */}
        <div className="App flex flex-col justify-center text-primaryText relative w-full min-h-screen">
          <img
            src={heroImage}
            alt="Murim Sect"
            className="absolute inset-0 w-full h-full lg:object custom-blur"
          />
          <div className="absolute inset-0 bg-background bg-opacity-60"></div> 
          object-scale-down max-h-full drop-shadow-md rounded-md m-auto
          {/* Dark overlay for text readability */}

          <div className="z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-6xl font-bold text-primaryText drop-shadow-lg tracking-wide">
              Welcome to the Tech Murim World
            </h1>
            <h2 className="text-3xl mt-4 text-primary font-semibold">
              You can call me Great Sensai
            </h2>
            <h3 className="text-2xl mt-4 text-secondaryText">
              I shall take you as my disciple
            </h3>
            <p className="text-secondaryText text-lg mt-6">
              Begin Your Journey and become a Murim Master
            </p>

            {/* CTA Button */}
            <button
              onClick={handleClick}
              className="mt-8 px-6 py-3 bg-primary text-white text-xl font-semibold rounded-lg hover:bg-hoverPrimary transition duration-300"
            >
              Start Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
