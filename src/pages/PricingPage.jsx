import React from 'react';
import { PRICING_PLANS } from '../constants';
import { useNavigate } from 'react-router-dom';

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
        <div className="bg-background py-2 px-4 sm:px-6 lg:px-8 sm:pb-8 min-h-screen flex flex-col items-center">
            <div className="w-full h-full"></div>
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-8 text-primary">
                    Choose Your Plan
                </h1>
                <div className="flex flex-wrap justify-center gap-6">
                    {PRICING_PLANS.map((plan, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-tr from-secondary to-hoverSecondary backdrop-blur-3xl shadow-lg rounded-3xl p-6 w-full sm:w-80 relative outline outline-1 outline-border h-4/6"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-primary">
                                {plan.name}
                            </h2>
                            <p className="text-secondaryText mb-6">{plan.description}</p>
                            <div className="text-3xl font-extrabold mb-6 text-muted">
                                {plan.price}
                            </div>
                            <ul className="text-left mb-6 text-primaryText">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="mb-2 flex items-center">
                                        <svg
                                            className="h-5 w-5 text-muted mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="bg-primary text-white py-2 px-4 rounded-full w-full font-semibold hover:bg-hoverPrimary transition"
                                onClick={() => handlePayment(plan.name)}
                            >
                                {plan.buttonLabel}
                            </button>

                            {/* Decorative border */}
                            <div className="absolute inset-0 border-4 border-muted rounded-lg -z-10" style={{ borderRadius: '12px' }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
