// @/components/FarmStats.tsx
import React from 'react';
import { Build } from '@/types'; // 1. Import your actual Build type

interface StatsProps {
    data: Build | null; // 2. Use the real Build type here
}

export const FarmStats = ({ data }: StatsProps) => {
    // Helper to safely format the rate whether it's a string or number
    const formatRate = (rate: string | number | undefined) => {
        if (!rate) return "0";
        if (typeof rate === 'string') return rate;
        return rate.toLocaleString();
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="space-y-5">
                {/* Output */}
                <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-500 font-medium">Output</span>
                    <span className="text-gray-600 font-semibold">{data?.output || "—"}</span>
                </div>

                {/* Rate - Fixed to handle string or number */}
                <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-600 font-medium">Rate per Hour</span>
                    <span className="text-gray-600 font-bold">{formatRate(data?.rate_per_hr)} items</span>
                </div>

                {/* Difficulty */}
                <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-500 font-medium">Difficulty</span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-bold">{data?.difficulty || "0"}/10</span>
                    </div>
                </div>

                {/* AFK */}
                <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-600 font-medium">AFK Capable</span>
                    <span className={`font-bold uppercase ${data?.afk ? 'text-green-600' : 'text-red-700'}`}>
                        {data?.afk ? "Yes" : "No"}
                    </span>
                </div>

                {/* Dimension */}
                <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-500 font-medium">Dimension</span>
                    <span className={`font-semibold ${data?.dimension?.toLowerCase() === 'nether' ? 'text-red-600' :
                            (data?.dimension?.toLowerCase() === 'the end' || data?.dimension?.toLowerCase() === 'end') ? 'text-purple-600' :
                                'text-green-600'
                        }`}>
                        {data?.dimension || "Overworld"}
                    </span>
                </div>
            </div>
        </div>
    );
};