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
            className="flex items-center w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-amber-500 transition-all"
        >
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a farm (e.g. Iron, Gold...)"
                className="w-full px-4 py-3 text-gray-900 focus:outline-none"
            />
            <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 font-semibold transition-colors"
            >
                Search
            </button>
        </form>
    );
}