import { NavigationBar } from '@/components/NavigationBar';
import { Footer } from '@/components/Footer';
import { getBuildById } from '@/lib/buildapi';
import { FarmStats } from '@/components/FarmStats';
import { MaterialsList } from '@/components/MaterialsList';
import { YouTubeEmbed } from '@/components/YouTubeEmbed';
import { FarmHeader } from '@/components/FarmHeader'; // Import the new component
import Link from 'next/link';

export default async function FarmDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    let farmData = null;
    try {
        farmData = await getBuildById(id);
    } catch (error) {
        console.error("Could not fetch farm details:", error);
    }

    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            <NavigationBar />

            <div className="container mx-auto pt-8 pb-12 px-4 relative">
                {/* --- BACK BUTTON --- */}
                <div className="mb-8">
                    <Link
                        href="/farms"
                        // Added 'inline-flex items-center justify-center' for perfect centering
                        className="group inline-flex items-center justify-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm leading-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            // Ensure the SVG doesn't push the text height
                            style={{ display: 'block' }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {/* Wrapping text in a span can help with fine-tuned alignment if needed */}
                        <span className="relative top-[5px]">Back to Search</span>
                    </Link>
                </div>

                {/* NEW HEADER COMPONENT */}
                <FarmHeader
                    name={farmData?.build?.name}
                    java={farmData?.build?.java}
                    version={farmData?.build?.version}
                />

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* LEFT COLUMN */}
                    <section className="space-y-6">
                        <FarmStats data={farmData?.build || null} />
                        <YouTubeEmbed url={farmData?.build?.youtubelink} />
                    </section>

                    {/* RIGHT COLUMN */}
                    <section>
                        <MaterialsList materials={farmData?.materials || null} />
                    </section>
                </div>
            </div>

            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    );
}