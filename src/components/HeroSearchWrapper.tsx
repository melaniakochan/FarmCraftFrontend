'use client'; // This makes the whole wrapper interactive

import { useState } from 'react';
import { HeroSection } from './HeroSection';
import { SearchBar } from './SearchBar';

interface WrapperProps {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaHref: string;
}

export function HeroSearchWrapper({ headline, subheadline, ctaText, ctaHref }: WrapperProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        console.log("Searching for:", query);
        setSearchQuery(query);
        // You can add logic here to filter your farm list!
    };

    return (
        <HeroSection
            headline={headline}
            subheadline={subheadline}
            ctaText={ctaText}
            ctaHref={ctaHref}
        >
            <SearchBar
                placeholder="Search for farm guides..."
                onSearch={handleSearch}
            />

            {searchQuery && (
                <p className="mt-4 text-green-200">
                    Showing results for: <strong>{searchQuery}</strong>
                </p>
            )}
        </HeroSection>
    );
}