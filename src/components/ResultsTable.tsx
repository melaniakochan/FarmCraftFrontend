import { Build } from '@/types';
import Link from 'next/link';

interface ResultsTableProps {
    builds: Build[];
}

export function ResultsTable({ builds }: ResultsTableProps) {
    // Helper to map numeric difficulty to text and color
    const getDifficultyBadge = (level: number) => {
        if (level <= 1) return { label: 'Easy', class: 'bg-green-100 text-green-700' };
        if (level === 2) return { label: 'Medium', class: 'bg-yellow-100 text-yellow-700' };
        return { label: 'Hard', class: 'bg-red-100 text-red-700' };
    };

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 bg-white text-sm text-black">
                <thead className="bg-gray-50 text-left">
                    <tr>
                        <th className="px-4 py-3 font-semibold text-gray-900">Farm Name</th>
                        <th className="px-4 py-3 font-semibold text-gray-900">Version</th>
                        <th className="px-4 py-3 font-semibold text-gray-900">Difficulty</th>
                        <th className="px-4 py-3 font-semibold text-gray-900">Rate/hr</th>
                        <th className="px-4 py-3 font-semibold text-gray-900 text-right">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {builds.map((build) => {
                        const difficulty = getDifficultyBadge(build.difficulty);

                        return (
                            <tr key={build.id_string} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-4 font-medium text-blue-600">
                                    {build.name}
                                    <div className="text-[10px] text-gray-400 uppercase">{build.dimension}</div>
                                </td>
                                <td className="px-4 py-4 text-gray-700">
                                    {build.version}
                                    {build.java && <span className="ml-1 text-[10px] bg-orange-100 text-orange-700 px-1 rounded">Java</span>}
                                </td>
                                <td className="px-4 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficulty.class}`}>
                                        {difficulty.label}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-gray-700">
                                    {build.rate_hr.toLocaleString()} {build.output}
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <Link
                                        href={build.youtubelink}
                                        target="_blank"
                                        className="inline-block px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                                    >
                                        Watch Tutorial
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}