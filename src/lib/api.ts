import { Build } from '@/types';

// Use the full URL provided by your teammate (including the stage like /dev)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getBuilds(): Promise<Build[]> {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined in .env.local");
  }

  try {
    // Note: We removed the extra "/builds" if your API URL already points to the function
    const response = await fetch(`${API_BASE_URL}/builds`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });
    const text = await response.text();
    console.log("RAW RESPONSE:", text.substring(0, 100));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = JSON.parse(text)
    // AWS Lambda often returns the data inside a 'body' property if not using Proxy Integration
    // If your app.py is handled by a Function URL, 'data' might be the array directly.
    return Array.isArray(data) ? data : JSON.parse(data.body || '[]');

  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}