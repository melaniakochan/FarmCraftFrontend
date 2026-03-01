/**
 * TypeScript type definitions for Minecraft Farm Wiki
 */

/**
 * Represents a farm category for the wiki
 */
export interface FarmCategory {
  id: string;
  title: string;
  description: string;
}

/**
 * Represents a navigation link
 */
export interface NavLink {
  label: string;
  href: string;
}

/**
 * Props for the NavigationBar component
 */
export interface NavigationBarProps {
  siteName?: string;
}

/**
 * Props for the HeroSection component
 */
export interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  children?: React.ReactNode;
}

/**
 * Props for the FeatureCard component
 */
export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

/**
 * Props for the FarmCategories component
 */
export interface FarmCategoriesProps {
  categories: FarmCategory[];
}

/**
 * Props for the Footer component
 */
export interface FooterProps {
  copyrightYear?: number;
  siteName?: string;
}

/**
 * Represents a Minecraft farm build from the API
 */
export interface Build {
  id: number;
  name: string;
  output: string;
  dimension: string;
  rateperhr: number | string;
  difficulty: number;
  afk: boolean;
  version: string;
  java: boolean;
  youtubelink: string;
}
/**
 * Props for the SearchBar component
 */
export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  defaultValue?: string;
}

/**
 * Props for the HeroSearchWrapper component
 */
export interface HeroSearchWrapperProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
}

/**
 * Props for the SearchResults component
 */
export interface SearchResultsProps {
  initialData?: Build[]; // Optional prop
}