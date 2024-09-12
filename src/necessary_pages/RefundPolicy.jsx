import React from 'react';
import { REFUND_POLICY } from '../constants';

const RefundPolicy = () => {
    return (
        <div className="bg-[#181d23] text-gray-50 py-20 px-6 lg:px-8 h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Refund Policy</h1>
                <p className="t whitespace-pre-line">{REFUND_POLICY}</p>
            </div>
        </div>
    );
};

export default RefundPolicy;
