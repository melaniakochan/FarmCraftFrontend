import { BuildApiResponse } from '@/types';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetches a single build by its ID.
 * Endpoint: API_BASE/builds/IDSTRINGNUM
 */
// Update the Promise type to BuildApiResponse (or whatever you named the full interface)
export async function getBuildById(buildId: string): Promise<BuildApiResponse> {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined in .env.local");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/builds/${buildId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch build ${buildId}: ${response.status}`);
    }

    const data = await response.json();

    // 1. Handle AWS Lambda "body" wrapper
    const result = data.body ? JSON.parse(data.body) : data;

    // 2. Return the entire object (containing build and materials)
    return result as BuildApiResponse;

  } catch (error) {
    console.error(`Error in getBuildById for ID ${buildId}:`, error);
    throw error;
  }
}