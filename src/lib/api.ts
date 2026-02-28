import { Build } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetches all builds from the API
 */
export async function getBuilds(): Promise<Build[]> {
  const response = await fetch(`${API_BASE_URL}/builds`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch builds: ${response.status}`);
  }

  return response.json();
}
