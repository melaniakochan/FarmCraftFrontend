import Link from 'next/link';
import { HeroSectionProps } from '@/types';

/**
 * HeroSection component displays the main headline, subheadline, and call-to-action
 * for the landing page. Uses semantic HTML with proper heading hierarchy.
 */
export function HeroSection({ headline, subheadline, ctaText, ctaHref, children }: HeroSectionProps) {
  return (
    <section
      className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1
          id="hero-heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          {headline}
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-green-100 mb-10 max-w-2xl mx-auto">
          {subheadline}
        </p>
        <Link
          href={ctaHref}
          className="inline-block bg-amber-500 mb-10 hover:bg-amber-400 text-gray-900 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-green-900"
        >
          {ctaText}
        </Link>

        <div className="w-full max-w-md mx-auto">
          {children}
        </div>

      </div>

    </section>
  );
}
