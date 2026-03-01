import { NavigationBar } from '@/components/NavigationBar';
import { Footer } from '@/components/Footer';
import { getBuildById } from '@/lib/buildapi';
import { FarmStats } from '@/components/FarmStats';
import { MaterialsList } from '@/components/MaterialsList';
import { YouTubeEmbed } from '@/components/YouTubeEmbed';
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

    // --- THE FIX ---
    // 1. Get the name from API
    // 2. Replace all underscores with spaces
    // 3. Fallback to "Unknown Farm"
    const rawName = farmData?.build?.name || "Unknown Farm";
    const farmName = rawName.replace(/_/g, ' ');

    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            <NavigationBar />

            <div className="container mx-auto pt-8 pb-12 px-4 relative">
                {/* BACK BUTTON */}
                <div className="mb-8">
                    <Link
                        href="/farms"
                        className="group inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Search
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-gray-500">Farm Details</h1>

                {/* Added 'capitalize' class here to make it look professional */}
                <p className="mt-4 text-2xl font-semibold text-gray-900 capitalize">
                    {farmName}
                </p>

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