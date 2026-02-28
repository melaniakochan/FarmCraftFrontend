import { FarmCategory, FarmCategoriesProps } from '@/types';
import { FeatureCard } from './FeatureCard';

/**
 * Static farm categories data for the landing page
 */
export const FARM_CATEGORIES: FarmCategory[] = [
  {
    id: 'crop-farms',
    title: 'Crop Farms',
    description: 'Automated wheat, carrot, potato, and other crop harvesting systems',
  },
  {
    id: 'mob-farms',
    title: 'Mob Farms',
    description: 'XP and loot farms for hostile and passive mobs',
  },
  {
    id: 'resource-farms',
    title: 'Resource Farms',
    description: 'Iron, gold, and other resource generation systems',
  },
];

/**
 * FarmCategories component displays a responsive grid of farm category cards.
 * Uses semantic section element with aria-labelledby for accessibility.
 */
export function FarmCategories({ categories }: FarmCategoriesProps) {
  return (
    <section aria-labelledby="farm-categories-heading" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2
          id="farm-categories-heading"
          className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12"
        >
          Explore Farm Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <FeatureCard
              key={category.id}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
