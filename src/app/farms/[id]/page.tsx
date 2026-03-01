import { NavigationBar } from '@/components/NavigationBar';
import { Footer } from '@/components/Footer';
import { getBuildById } from '@/lib/buildapi';
import { FarmStats } from '@/components/FarmStats';
import { MaterialsList } from '@/components/MaterialsList'; // Import the new component
import Link from 'next/link';

export default async function FarmDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    let farmData = null;
    try {
        // This returns { build: Build, materials: Record<string, any> }
        farmData = await getBuildById(id);
    } catch (error) {
        console.error("Could not fetch farm details:", error);
    }

    const farmName = farmData?.build?.name || "Unknown Farm";

    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            <NavigationBar />

            <div className="container mx-auto py-12 px-4">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        href="/farms"
                        className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Search Results
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-gray-500">Farm Details</h1>
                <p className="mt-4 text-2xl font-semibold text-gray-900">{farmName}</p>

                {/* Main Grid Container */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                    {/* LEFT COLUMN: Technical Specs */}
                    <section className="space-y-4">
                        <FarmStats data={farmData?.build || null} />
                    </section>

                    {/* RIGHT COLUMN: Materials List */}
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