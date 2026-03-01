import { Build } from '@/types';

interface SimpleBuildProps {
    build: Build | null;
}

export function SimpleBuildCard({ build }: SimpleBuildProps) {
    // If the API hasn't returned anything yet or the fetch failed
    if (!build) {
        return <div className="p-4 border border-red-200 bg-red-50 text-red-600">No build found.</div>;
    }

    return (
        <div className="p-4 border rounded-md shadow-sm bg-white">
            <p className="text-sm text-gray-500 font-mono">ID: {build.id_string}</p>
            <h2 className="text-xl font-bold text-black">Name: {build.name}</h2>
        </div>
    );
}