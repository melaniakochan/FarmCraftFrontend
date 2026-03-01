'use client'

import Link from 'next/link';
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
                        <th className="px-4 py-3 min-w-[180px] text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Farm Name</th>
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
                            {/* THE LINK: Only wraps the name text inside the TD */}
                            <td className="px-4 py-4 text-sm font-medium">
                                <Link
                                    href={`/farms/${farm.id}`}
                                    className="text-blue-600 hover:text-blue-800 hover:underline decoration-blue-400 decoration-2 underline-offset-2"
                                >
                                    {farm.name}
                                </Link>
                            </td>

                            {/* REST OF THE DATA: Remains visible and correctly aligned */}
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
}