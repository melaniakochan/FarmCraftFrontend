// @/components/FarmHeader.tsx
import React from 'react';
import { FarmHeaderProps } from '@/types';

export const FarmHeader = ({ name, java, version }: FarmHeaderProps) => {
    // Clean up underscores from the raw name
    const farmName = name?.replace(/_/g, ' ') || "Unknown Farm";

    return (
        <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-500">Farm Details</h1>

            <div className="mt-4 flex flex-wrap items-center">
                {/* Farm Name - Added mr-8 for a clear "regular" space to the right */}
                <p className="text-2xl font-semibold text-gray-900 capitalize mr-9">
                    {farmName}
                </p>

                {/* Info Group - Edition and Version */}
                <div className="flex items-center gap-4">
                    {/* Edition Badge */}
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-900">
                        {java ? 'Java Edition' : 'Bedrock Edition'}
                    </span>

                    {/* Version Badge */}
                    {version && (
                        <span className="text-sm font-bold text-gray-600">
                            {version}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};