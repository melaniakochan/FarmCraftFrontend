// Landing page components
import { NavigationBar } from '@/components/NavigationBar';
import { HeroSection } from '@/components/HeroSection';
import { FarmCategories, FARM_CATEGORIES } from '@/components/FarmCategories';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* NavigationBar - Site header with navigation links */}
      <NavigationBar />

      {/* HeroSection - Main headline and call-to-action */}
      <HeroSection
        headline="Minecraft Automated Farm Wiki"
        subheadline="Your comprehensive guide to building efficient automated farms. From simple crop harvesters to complex mob grinders, master the art of automation."
        ctaText="Explore Farms"
        ctaHref="/farms"
      />

      {/* FarmCategories - Grid of farm category cards */}
      <FarmCategories categories={FARM_CATEGORIES} />

      {/* Footer - Copyright and site information */}
      <Footer />
    </main>
  );
}
