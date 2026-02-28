import { FeatureCardProps } from '@/types';

/**
 * FeatureCard component displays a farm category with title, description,
 * and optional icon. Uses semantic article element for proper document structure.
 */
export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <article className="p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      {icon && (
        <div className="mb-3 sm:mb-4 text-green-700" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </article>
  );
}
