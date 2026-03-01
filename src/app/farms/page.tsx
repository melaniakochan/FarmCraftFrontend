import { NavigationBar } from '@/components/NavigationBar';
import { SearchBar } from '@/components/SearchBar';
import { Footer } from '@/components/Footer';
import { SimpleBuildCard } from '@/components/SimpleBuildCard';
import { getBuilds } from '@/lib/api';
import { getSpecificImage } from '@/lib/imageapi';
import { redirect } from 'next/navigation';
import type { Build } from '@/types';

/**
 * Sub-component to handle the async image fetch.
 * Since this is a Server Component, Next.js will wait for this 
 * to resolve before finishing the page stream.
 */
async function ImagePreview({ itemName }: { itemName: string }) {
    try {
        // Now returns the object: { url: "https://s3..." }
        const data = await getSpecificImage(itemName);

        return (
            <img 
                src={data.url} 
                alt={`Preview of ${itemName}`} 
                className="max-w-xs rounded shadow border border-gray-200" 
            />
        );
    } catch (e) {
        console.error("ImagePreview Error:", e);
        return <p className="text-xs text-red-400">Could not load image for "{itemName}"</p>;
    }
}
export default async function FarmsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q: query } = await searchParams;

    // 1. Fetch builds with a catch to prevent total page failure
    const allBuilds: Build[] = await getBuilds().catch(() => []);

    // 2. Identify the specific build to show (Logic remains same as your snippet)
    const displayBuild = allBuilds.length > 0 ? allBuilds[0] : null;

    async function handleSearchAction(formData: string) {
        'use server';
        redirect(`/farms?q=${encodeURIComponent(formData)}`);
    }

    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            {/* DEBUG SECTION */}
            <div className="bg-black text-green-400 p-2 text-[10px] font-mono overflow-auto max-h-40">
                DEBUG DATA: {JSON.stringify(allBuilds, null, 2)}
            </div>

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
                    <SimpleBuildCard build={displayBuild} />

                    {!displayBuild && (
                        <p className="mt-4 text-sm text-red-500 italic">
                            The array is empty. This means the API connected but found no data in DynamoDB.
                        </p>
                    )}
                </section>

                {/* IMAGE PREVIEW SECTION */}
                <div className="mt-8 p-4 border rounded bg-white max-w-md">
                    <h3 className="text-sm font-bold mb-2">Specific Image Preview:</h3>
                    {displayBuild ? (
                        <ImagePreview itemName="Chest" />
                    ) : (
                        <p className="text-xs text-gray-500 italic">
                            No builds found in the database to trigger image fetch.
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    );
}