import { NavigationBar } from '@/components/NavigationBar';
import { SearchBar } from '@/components/SearchBar';
import { Footer } from '@/components/Footer';
import { SimpleBuildCard } from '@/components/SimpleBuildCard';
import { getBuilds } from '@/lib/api';
import { redirect } from 'next/navigation';
import type { Build } from '@/types';

export default async function FarmsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q: query } = await searchParams;

    let allBuilds: Build[] = [];
    let errorMessage = null;

    try {
        allBuilds = await getBuilds();
    } catch (e) {
        console.error("PAGE FETCH ERROR:", e);
        errorMessage = "The API is currently unreachable. Check your .env.local URL.";
    }

    const displayBuild = allBuilds.length > 0 ? allBuilds[0] : null;

    async function handleSearchAction(formData: string) {
        'use server';
        redirect(`/farms?q=${encodeURIComponent(formData)}`);
    }

    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            <NavigationBar />

            <div className="container mx-auto py-8 px-4">
                <div className="max-w-2xl mb-12">
                    <h1 className="text-2xl font-bold mb-4">API Verification</h1>
                    <SearchBar defaultValue={query} onSearch={handleSearchAction} />
                </div>

                <section className="max-w-md">
                    <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2">
                        Latest Build Found
                    </h3>
                    {/* Just the name and the ID */}
                    <SimpleBuildCard build={displayBuild} />
                </section>
            </div>

            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    );
}