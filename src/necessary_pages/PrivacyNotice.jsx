import React from 'react';
import { PRIVACY_NOTICE } from '../constants';

const PrivacyNotice = () => {
    return (
        <div className="bg-[#181d23] text-gray-50 py-20 px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Privacy Notice</h1>
                <p className="whitespace-pre-line">{PRIVACY_NOTICE}</p>
            </div>
        </div>
    );
};

export default PrivacyNotice;
