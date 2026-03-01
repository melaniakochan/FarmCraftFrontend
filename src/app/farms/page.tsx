import { NavigationBar } from '@/components/NavigationBar';
import { SearchBar } from '@/components/SearchBar';
import { Footer } from '@/components/Footer';
import { getBuilds } from '@/lib/api';
import { redirect } from 'next/navigation';
// import { ResultsTable } from '@/components/ResultsTable'; // We'll build this next

export default async function FarmsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    // 1. Get the search query from the URL
    const { q: query } = await searchParams;

    // 2. Fetch all builds (or filter them if your API supports it)
    const allBuilds = await getBuilds();

    // 3. Simple client-side style filtering if your API doesn't filter by 'q' yet
    const filteredBuilds = query
        ? allBuilds.filter((build: any) =>
            build.name.toLowerCase().includes(query.toLowerCase())
        )
        : allBuilds;

    async function handleSearchAction(formData: string) {
        'use server';
        redirect(`/farms?q=${encodeURIComponent(formData)}`);
    }

    return (
        <main className="min-h-screen flex flex-col">
            <NavigationBar />

            <div className="container mx-auto py-8 px-4">
                {/* Search Bar at the top of the results */}
                <div className="max-w-2xl mb-12">
                    <h1 className="text-2xl font-bold mb-4">Search Results</h1>
                    <SearchBar defaultValue={query}
                        onSearch={handleSearchAction} />
                </div>

                {/* Results Section */}
                {filteredBuilds.length > 0 ? (
                    <section>
                        {/* Replace this with your Table component soon */}
                        <p className="mb-4 text-gray-600">Found {filteredBuilds.length} farms for "{query}"</p>
                        <div className="border rounded-lg p-4 bg-gray-50">
                            {/* Table Placeholder */}
                            <p>Results Table will go here...</p>
                        </div>
                    </section>
                ) : (
                    <div className="py-20 text-center">
                        <p className="text-xl text-gray-500">No farms found for "{query}". Try a different search!</p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}