// Landing page components
import { NavigationBar } from '@/components/NavigationBar';
import { HeroSection } from '@/components/HeroSection';
import { FarmCategories, FARM_CATEGORIES } from '@/components/FarmCategories';
import { Footer } from '@/components/Footer';
import { SearchBar } from '@/components/SearchBar';
import { HeroSearchWrapper } from '@/components/HeroSearchWrapper';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* NavigationBar - Site header with navigation links */}
      <NavigationBar />

      {/* HeroSection - Main headline and call-to-action */}
      <HeroSearchWrapper
        headline="Welcome to FarmCraft!"
        subheadline="Your comprehensive guide to building efficient automated farms. From simple crop harvesters to complex mob grinders, master the art of automation."
        ctaText="Explore Farm Guides"
        ctaHref="/farms"
      >
      </HeroSearchWrapper>

      {/* FarmCategories - Grid of farm category cards */}
      <FarmCategories categories={FARM_CATEGORIES} />

      {/* Footer - Copyright and site information */}
      <Footer />
    </main>
  );
}
