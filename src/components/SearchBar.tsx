'use client';

import { useState } from 'react';
import { SearchBarProps } from '@/types';

export function SearchBar({ placeholder, onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
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
                placeholder={placeholder}
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