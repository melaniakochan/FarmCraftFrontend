import { FooterProps } from '@/types';

/**
 * Footer component displaying copyright information and site name.
 * Uses semantic footer element for proper document structure.
 */
export function Footer({
  copyrightYear = new Date().getFullYear(),
  siteName = 'FarmCraft',
}: FooterProps) {
  return (
    <footer className="bg-green-900 text-green-100 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm md:text-base">
          © {copyrightYear} {siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
