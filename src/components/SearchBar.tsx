'use client';

import { useState, FormEvent } from 'react';
import { SearchBarProps } from '@/types';

export function SearchBar({ onSearch, defaultValue = '' }: SearchBarProps) {
    const [query, setQuery] = useState(defaultValue);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-stretch w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-green-500 transition-all h-12"
        >
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a farm (e.g. Iron, Gold...)"
                className="w-full px-4 flex items-center text-gray-900 focus:outline-none leading-none placeholder:leading-none"
            />
            <button
                type="submit"
                className="inline-flex items-center justify-center bg-green-700 hover:bg-green-800 text-white px-8 font-semibold transition-colors focus:outline-none leading-none h-full"
            >
                {/* Nudged slightly for optical centering */}
                <span className="relative top-[0.5px]">Search</span>
            </button>
        </form>
    );
}