import { NavigationBar } from '@/components/NavigationBar';
import { SearchBar } from '@/components/SearchBar';
import { Footer } from '@/components/Footer';
import { getBuilds } from '@/lib/api';
import { redirect } from 'next/navigation';
import type { Build } from '@/types';
import { SearchResults } from '@/components/SearchResults';
import { MOCK_FARMS } from '@/data/mockFarms';

export default async function FarmsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q: query } = await searchParams;

    //const allBuilds: Build[] = await getBuilds().catch(() => []);

    const allBuilds: Build[] = MOCK_FARMS.filter((farm) => {
        if (!query) return true;
        const searchTerm = query.toLowerCase();
        return (
            farm.name.toLowerCase().includes(searchTerm) ||
            farm.output.toLowerCase().includes(searchTerm)
        );
    }); //ADDED TO DISPLAY MOCK DATA

    const displayBuild = allBuilds.length > 0 ? allBuilds[0] : null;

    async function handleSearchAction(formData: string) {
        'use server';
        redirect(`/farms?q=${encodeURIComponent(formData)}`);
    }

    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            {/* shows [] */}
            <div className="bg-black text-green-400 p-2 text-[10px] font-mono overflow-auto max-h-40">
                DEBUG DATA (MOCK MODE): {JSON.stringify(allBuilds, null, 2)}
            </div>

            <NavigationBar />

            <div className="container mx-auto py-8 px-4">
                <div className="max-w-2xl mb-12">
                    <h1 className="text-2xl font-bold mb-4">API Verification</h1>
                    <SearchBar defaultValue={query} onSearch={handleSearchAction} />
                </div>

                <section className="w-full">
                    <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2">
                        Latest Build Found
                    </h3>
                    <SearchResults initialData={allBuilds} />

                    {!displayBuild && (
                        <p className="mt-4 text-sm text-red-500 italic">
                            The array is empty. This means the API connected but found no data in DynamoDB.
                        </p>
                    )}
                </section>
            </div>

            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    );
}