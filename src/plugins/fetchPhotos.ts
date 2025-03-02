


const pexelsApiUrl = 'https://api.pexels.com/v1/curated?per_page=16&page=1'

const fetchPhotos = async () => {
    try {
      const response = await fetch(pexelsApiUrl, {
        method: 'GET',
        headers: {
          Authorization: 'ApIimUraYf83WuL0dMBONzmiWZwbqKjNNzg5RpePMmp4O1AfVLbNwonU',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }

      const data: any = await response.json();

      return data
      
    } catch (err: any) {
      console.error(err)
    } 
  
  };
export default fetchPhotos