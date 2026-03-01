import { NavigationBar } from '@/components/NavigationBar';
import { SearchBar } from '@/components/SearchBar';
import { Footer } from '@/components/Footer';
import { getBuilds } from '@/lib/api';
import { redirect } from 'next/navigation';
import type { Build } from '@/types';
import { SearchResults } from '@/components/SearchResults';
import { getBuildById } from '@/lib/buildapi'; 
import { getSpecificImage } from '@/lib/imageapi';

/**
 * Sub-component to handle the async image fetch.
 */
async function ImagePreview({ itemName }: { itemName: string }) {
    try {
        const data = await getSpecificImage(itemName);
        return (
            <div className="mt-2">
                <p className="text-[10px] font-bold uppercase text-gray-400">Image API Result:</p>
                <img 
                    src={data.url} 
                    alt={`Preview of ${itemName}`} 
                    className="max-w-xs rounded shadow border border-gray-200" 
                />
            </div>
        );
    } catch (e) {
        return <p className="text-xs text-red-400">Could not load image for "{itemName}"</p>;
    }
}

export default async function TestSingleBuildPage({
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
    const TEST_ID = "0";
    let fullData: any = null; // Changed to 'any' for quick testing of the new structure
    let errorLog: string | null = null;

    /* try {
        // This now returns { build: {...}, materials: {...} }
        fullData = await getBuildById(TEST_ID);
    } catch (err: any) {
        console.error("Fetch Error:", err);
        errorLog = err.message || "Unknown error occurred fetching ID 0";
    }
    */

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
                <div className="max-w-2xl mb-8">
                    <h1 className="text-2xl font-bold mb-2">Build + Materials Test</h1>
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
        /*
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {}
                    <section>
                        <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2">Build Info</h3>
                        {fullData?.build ? (
                            <SimpleBuildCard build={fullData.build} />
                        ) : (
                            <div className="p-4 border border-dashed border-red-300 bg-red-50 rounded text-red-600 text-sm">
                                Build data missing from response.
                            </div>
                        )}
                        
                        {}
                        <div className="mt-6 p-4 border rounded bg-white">
                            <h3 className="text-sm font-bold mb-2">Image Test:</h3>
                            {fullData?.build ? (
                                <ImagePreview itemName={"Chest"} />
                            ) : (
                                <p className="text-xs text-gray-500 italic">No build name to fetch image for.</p>
                            )}
                        </div>
                    </section>

                    {}
                    <section>
                        <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2">Materials List</h3>
                        {fullData?.materials ? (
                            <div className="bg-white border rounded shadow-sm p-4">
                                <ul className="space-y-1">
                                    {Object.entries(fullData.materials).map(([item, count]) => (
                                        // Filter out the metadata IDs from the materials list
                                        !['id', 'bid'].includes(item) && (
                                            <li key={item} className="text-sm flex justify-between border-b border-gray-50 py-1">
                                                <span className="capitalize">{item.replace(/_/g, ' ')}</span>
                                                <span className="font-mono font-bold text-blue-600">{String(count)}</span>
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No materials found in response.</p>
                        )}
                    </section>
                </div> */
            </div>

            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    );
}