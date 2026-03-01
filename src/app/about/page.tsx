import { NavigationBar } from '@/components/NavigationBar';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            <NavigationBar />

            <div className="container mx-auto py-16 px-4 max-w-4xl">
                <header className="mb-12 border-b border-gray-200 pb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About FarmCraft</h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        A centralized platform for technical Minecraft automation, built for precision and efficiency.
                    </p>
                </header>

                <div className="space-y-12">
                    {/* Inspiration */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest text-gray-500 mb-4">Inspiration</h2>
                        <p className="leading-relaxed">
                            FarmCraft was born from a survival Minecraft server where our team sought to automate every resource possible.
                            Finding no centralized tool that met our needs, we built FarmCraft to provide a professional, integrated
                            resource for technical Minecraft players to reach their full potential.
                        </p>
                    </section>

                    {/* Technical Architecture */}
                    <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-gray-500 mb-6">Technical Architecture</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Backend & Storage</h3>
                                <p className="text-sm text-gray-600">
                                    Our system utilizes a full AWS-integrated backend. Data is structured in <strong>Amazon DynamoDB</strong> across
                                    specialized tables for Builds and Materials, while assets are hosted in <strong>Amazon S3</strong>.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Serverless Logic</h3>
                                <p className="text-sm text-gray-600">
                                    <strong>AWS Lambda</strong> handles our API functions, enabling secure, scalable data retrieval
                                    without the overhead of managing dedicated servers.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-2">Frontend Performance</h3>
                            <p className="text-sm text-gray-600">
                                Developed with <strong>Next.js and React</strong>, the site uses asynchronous sub-components to
                                isolate high-latency API calls. This prevents page-load "waterfalls" and ensures a seamless user experience.
                            </p>
                        </div>
                    </section>

                    {/* Roadmap */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest text-gray-500 mb-4">Roadmap</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <li className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-sm text-gray-800">
                                User Authentication & Favorites
                            </li>
                            <li className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-sm text-gray-800">
                                In-Game "Chest View" UI
                            </li>
                            <li className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-sm text-gray-800">
                                Expanded Cross-Platform Database
                            </li>
                        </ul>
                    </section>
                </div>
            </div>

            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    );
}