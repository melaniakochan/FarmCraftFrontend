import { NavigationBar } from '@/components/NavigationBar';
import { SearchBar } from '@/components/SearchBar';
import { Footer } from '@/components/Footer';
import { getBuilds } from '@/lib/api';
import { redirect } from 'next/navigation';
import type { Build } from '@/types';
import { SearchResults } from '@/components/SearchResults';
import { getBuildById } from '@/lib/buildapi';

export default async function FarmsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q: query } = await searchParams;

    // 1. Get the real list from the API
    // We fetch everything, then filter based on the user's search query
    const apiBuilds: Build[] = await getBuilds().catch(() => []);

    const filteredBuilds = apiBuilds.filter((farm) => {
        if (!query) return true;
        const searchTerm = query.toLowerCase();
        return (
            farm.name.toLowerCase().includes(searchTerm) ||
            farm.output.toLowerCase().includes(searchTerm)
        );
    });

    // 2. Search Action for the SearchBar component
    async function handleSearchAction(formData: string) {
        'use server';
        redirect(`/farms?q=${encodeURIComponent(formData)}`);
    }

    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            <NavigationBar />

            <div className="container mx-auto py-8 px-4">
                <div className="max-w-2xl mb-12">
                    <h1 className="text-3xl font-bold mb-2 tracking-tight text-gray-500">Minecraft Farm Database</h1>
                    <p className="text-gray-500 mb-6">Search through community-tested builds and rates.</p>
                    <SearchBar defaultValue={query} onSearch={handleSearchAction} />
                </div>

                <section className="w-full">
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="text-sm font-semibold uppercase text-gray-400 tracking-widest">
                            {query ? `Results for "${query}"` : 'Latest Builds'}
                        </h3>
                        <span className="text-xs text-gray-400 font-mono">
                            {filteredBuilds.length} farms found
                        </span>
                    </div>

                    {/* YOUR PRETTY UI: Just pass the filtered API data here */}
                    <SearchResults initialData={filteredBuilds} />

                    {filteredBuilds.length === 0 && (
                        <div className="mt-8 p-12 text-center border-2 border-dashed rounded-xl border-gray-200">
                            <p className="text-gray-400 italic">No farms matching that criteria were found in the database.</p>
                        </div>
                    )}
                </section>
            </div>

            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    );
}