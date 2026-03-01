import React from 'react';
import { MaterialsListProps } from '@/types';

export const MaterialsList = ({ materials }: MaterialsListProps) => {
    if (!materials) return null;

    const filteredMaterials = Object.entries(materials).filter(
        ([key]) => !['id', 'bid', 'partition_key', 'sort_key'].includes(key.toLowerCase())
    );

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-4 tracking-widest">
                Required Materials
            </h3>

            <ul className="divide-y divide-gray-50">
                {filteredMaterials.map(([item, count]) => (
                    <li key={item} className="py-1.5 flex justify-between items-center">
                        <span className="text-xs text-gray-700 capitalize">
                            {item.replace(/_/g, ' ')}
                        </span>
                        <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                            {String(count)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};