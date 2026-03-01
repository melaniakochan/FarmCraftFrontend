'use client'

import { useState, useEffect } from 'react';
import { Build, SearchResultsProps } from '../types/index';

export const SearchResults = ({ initialData }: SearchResultsProps) => {
    const [farms, setFarms] = useState<Build[]>(initialData || []);

    useEffect(() => {
        setFarms(initialData || []);
    }, [initialData]);

    if (!farms || farms.length === 0) {
        return (
            <div className="p-4 border border-dashed border-gray-300 rounded text-gray-500">
                No farms found matching your search.
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                        {/* Explicitly set text-gray-900 for high contrast */}
                        <th className="px-4 py-3 min-w-45 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Farm Name</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Output</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Rate/hr</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Difficulty</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Edition</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Version</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {farms.map((farm) => (
                        <tr key={farm.id} className="hover:bg-gray-50 transition-colors">
                            {/* Use text-gray-800 or black for the data cells */}
                            <td className="px-4 py-4 text-sm font-medium text-gray-800">{farm.name}</td>
                            <td className="px-4 py-4 text-sm text-gray-800">{farm.output}</td>
                            <td className="px-4 py-4 text-sm text-gray-800">{farm.rate_per_hr}</td>
                            <td className="px-4 py-4 text-sm text-gray-800">{farm.difficulty}</td>
                            <td className="px-4 py-4 text-sm text-gray-800">{farm.java ? "Java" : "Bedrock"}</td>
                            <td className="px-4 py-4 text-sm text-gray-800">{farm.version}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};