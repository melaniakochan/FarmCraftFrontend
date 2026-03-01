'use client';

import { useState } from 'react';
import { HeroSection } from './HeroSection';
import { SearchBar } from './SearchBar';
import { HeroSearchWrapperProps } from '@/types';
import { useRouter } from 'next/navigation';

export function HeroSearchWrapper({ headline, subheadline, ctaText, ctaHref }: HeroSearchWrapperProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (query: string) => {
        console.log("Searching for:", query);
        setSearchQuery(query);
        router.push(`/farms?q=${encodeURIComponent(query)}`);
    };

    return (
        <HeroSection
            headline={headline}
            subheadline={subheadline}
            ctaText={ctaText}
            ctaHref={ctaHref}
        >
            {/* CHANGE: Use the handleSearch function defined above */}
            <SearchBar onSearch={handleSearch} />
        </HeroSection>
    );
}