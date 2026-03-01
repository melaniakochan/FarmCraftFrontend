import { NavigationBar } from '@/components/NavigationBar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default async function FarmDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            <NavigationBar />
            <div className="container mx-auto py-12 px-4">
                <div className="mb-6">
                    <Link
                        href="/farms"
                        className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        {/* Heroicons-style arrow */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Search Results
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-gray-500">Farm Details</h1>
                <p className="mt-4 text-gray-600">
                    You are viewing the details for Farm ID: <span className="font-mono text-blue-600 font-bold">{id}</span>
                </p>

                <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                    <p className="italic text-gray-400">Step 2 will be fetching the DynamoDB data for this ID...</p>
                </div>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    );
}