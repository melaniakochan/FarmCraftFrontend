const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getSpecificImage(itemName: string): Promise<{ url: string }> {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined in .env.local");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/get-specific-image/${itemName}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json', 
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for item: ${itemName}`);
    }

    // Parse as JSON to get the "url" property
    return await response.json();

  } catch (error) {
    console.error(`Fetch failed for image metadata ${itemName}:`, error);
    throw error;
  }
}