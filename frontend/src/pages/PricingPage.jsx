import React from 'react';
import { PRICING_PLANS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaStar } from 'react-icons/fa';

const PricingPage = () => {
    const navigate = useNavigate();

    const handlePayment = async (planName) => {
        try {
            if (planName !== "Free") {
                navigate('/payment'); // Navigate to payment flow for Premium or Super Premium
            } else {
                navigate('/dashboard'); // Redirect to dashboard for Free plan
            }
        } catch (error) {
            console.error("Payment initiation failed:", error);
            // Handle the error, show a message to the user, etc.
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                    Choose Your Journey
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Select the plan that best fits your learning goals and unlock your full potential
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
                {PRICING_PLANS.map((plan, index) => {
                    // Check if this is a featured plan
                    const isFeatured = plan.name === "Premium" || plan.name === "Super Premium";
                    
                    return (
                        <div
                            key={index}
                            className={`
                                w-full sm:w-80 lg:w-96 rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2
                                ${isFeatured 
                                    ? 'bg-gradient-to-b from-purple-600 to-indigo-700 text-white shadow-xl shadow-purple-300/20' 
                                    : 'bg-white text-gray-800 shadow-lg'
                                }
                            `}
                        >
                            {/* Plan Header */}
                            <div className={`p-6 ${isFeatured ? '' : 'border-b border-gray-100'}`}>
                                {isFeatured && (
                                    <div className="bg-yellow-500 text-black text-xs font-bold uppercase py-1 px-2 rounded-full inline-flex items-center mb-3">
                                        <FaStar className="mr-1" /> Recommended
                                    </div>
                                )}
                                <h2 className={`text-2xl font-bold ${isFeatured ? 'text-white' : 'text-gray-800'}`}>
                                    {plan.name}
                                </h2>
                                <p className={`mt-2 ${isFeatured ? 'text-purple-200' : 'text-gray-600'}`}>
                                    {plan.description}
                                </p>
                                <div className={`text-4xl font-extrabold mt-4 ${isFeatured ? 'text-white' : 'text-purple-600'}`}>
                                    {plan.price}
                                </div>
                            </div>

                            {/* Features List */}
                            <div className={`px-6 pt-6 pb-8 ${isFeatured ? 'bg-black/20' : 'bg-white'}`}>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${isFeatured ? 'bg-purple-400/30 text-white' : 'bg-purple-100 text-purple-600'}`}>
                                                <FaCheck className="h-3 w-3" />
                                            </span>
                                            <span className={`ml-3 text-sm ${isFeatured ? 'text-white' : 'text-gray-600'}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                
                                {/* CTA Button */}
                                <button
                                    className={`
                                        w-full py-3 px-6 rounded-lg font-medium text-center transition-all duration-300
                                        ${isFeatured 
                                            ? 'bg-white text-purple-700 hover:bg-gray-100' 
                                            : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90'
                                        }
                                    `}
                                    onClick={() => handlePayment(plan.name)}
                                >
                                    {plan.buttonLabel}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Additional Info */}
            <div className="max-w-3xl mx-auto mt-16 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h3>
                <p className="text-gray-600 mb-6">We're here to help you choose the right plan for your learning journey.</p>
                <button 
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                >
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default PricingPage;