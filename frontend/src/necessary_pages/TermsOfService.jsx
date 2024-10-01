import React from 'react';
import { TERMS_OF_SERVICE } from '../constants';

const TermsOfService = () => {
    return (
        <div className="bg-[#181d23] text-gray-50 py-20 px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
                <p className=" whitespace-pre-line">{TERMS_OF_SERVICE}</p>
            </div>
        </div>
    );
};

export default TermsOfService;
