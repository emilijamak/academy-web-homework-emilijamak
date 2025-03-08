import { useEffect, useRef, useState } from "react";
import { Photo } from "../model/IPhoto";
import fetchPhotos from "../plugins/fetchPhotos";
import Card from "./card";

interface PhotoGalleryProps {
  showFavorites: boolean;
}

function PhotoGallery({ showFavorites }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const triggerFetchRef = useRef<HTMLDivElement | null>(null);

  // Load saved photos from localStorage on initial render
  useEffect(() => {
    const savedPhotosJson = localStorage.getItem("photos");
    if (savedPhotosJson) {
      setPhotos(JSON.parse(savedPhotosJson));
    }
  }, []);

  // Fetch new photos when page changes
  useEffect(() => {
    // Don't fetch more photos when in favorites mode
    if (showFavorites) return;

    const loadPhotos = async () => {
      setIsLoading(true);
      try {
        const newPhotos = await fetchPhotos("curated", {
          per_page: "16",
          page: page.toString(),
        });

        const savedPhotosJson = localStorage.getItem("photos");
        const savedPhotos: Photo[] = savedPhotosJson ? JSON.parse(savedPhotosJson) : [];

        const savedPhotoMap = new Map(savedPhotos.map(photo => [photo.id, photo]));

        const updatedPhotos = newPhotos.map((photo: Photo) =>
          savedPhotoMap.has(photo.id) ? { ...photo, liked: savedPhotoMap.get(photo.id)?.liked } : photo
        );

        const mergedPhotos = page === 1 ? updatedPhotos : [...photos, ...updatedPhotos];
        const uniquePhotos = Array.from(new Map(mergedPhotos.map(photo => [photo.id, photo])).values());

        setPhotos(uniquePhotos);
        localStorage.setItem("photos", JSON.stringify(uniquePhotos));
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
      setIsLoading(false);
    };

    loadPhotos();
  }, [page, showFavorites]);

  // Toggle favorite status for a photo
  const handleFavoritePhoto = (id: number) => {
    const updatedPhotos = photos.map(photo =>
      photo.id === id ? { ...photo, liked: !photo.liked } : photo
    );
    setPhotos(updatedPhotos);
    localStorage.setItem("photos", JSON.stringify(updatedPhotos));
  };

  // Setup intersection observer for infinite scrolling
  useEffect(() => {
    // Don't observe for infinite scroll when in favorites mode
    if (showFavorites) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage(prevPage => prevPage + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (triggerFetchRef.current) {
      observer.observe(triggerFetchRef.current);
    }

    return () => {
      if (triggerFetchRef.current) {
        observer.unobserve(triggerFetchRef.current);
      }
    };
  }, [isLoading, showFavorites]);

  // Filter photos based on the showFavorites prop
  const displayedPhotos = showFavorites ? photos.filter(photo => photo.liked) : photos;

  return (
    <div className="photo-gallery">
     
        {displayedPhotos.map(photo => (
          <div
            className="photo-card"
            key={`photo-${photo.id}`}
            onClick={() => handleFavoritePhoto(photo.id)}
          >
            <Card data={photo} />
          </div>
        ))}
     

      {!showFavorites && <div ref={triggerFetchRef} style={{ height: "20px" }} />}
      {isLoading && !showFavorites && <p>Loading...</p>}
      {showFavorites && displayedPhotos.length === 0 && (
        <p>No favorite photos yet.</p>
      )}
    </div>
  );
}

export default PhotoGallery;