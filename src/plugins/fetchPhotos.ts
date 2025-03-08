const PEXELS_API_URL = 'https://api.pexels.com/v1';

const fetchPhotos = async (endpoint: string, params: Record<string, string> = {}) => {
  const url = new URL(`${PEXELS_API_URL}/${endpoint}`);

  // Append query parameters
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: 'ApIimUraYf83WuL0dMBONzmiWZwbqKjNNzg5RpePMmp4O1AfVLbNwonU',
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Failed to fetch photos`);
    }

    const data = await response.json();
    return data.photos; // Only return relevant data

  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error; // Allow the caller to handle errors
  }
};

export default fetchPhotos;
