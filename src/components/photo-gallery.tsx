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

  // fetches photos from pexels API

  useEffect(() => {
    const savedPhotosJson = localStorage.getItem("photos");
    if (savedPhotosJson) {
      setPhotos(JSON.parse(savedPhotosJson));
    }
  }, []);

  // on reload checks if photos are already saved in the local storage

  useEffect(() => {
    if (showFavorites) return;

    const loadPhotos = async () => {
      setIsLoading(true);

      try {
        const newPhotos: Photo[] = await fetchPhotos("curated", {
          per_page: "16",
          page: page.toString(),
        });

        const savedPhotosJson = localStorage.getItem("photos");
        const savedPhotos: Photo[] = savedPhotosJson
          ? JSON.parse(savedPhotosJson)
          : [];

        const savedPhotoMap = new Map(
          savedPhotos.map((photo) => [photo.id, photo])
        );

        const updatedPhotos = newPhotos.map((photo: Photo) => ({
          ...photo,
          liked: savedPhotoMap.has(photo.id)
            ? savedPhotoMap.get(photo.id)?.liked ?? false
            : false,
        }));

        const mergedPhotos =
          page === 1 ? updatedPhotos : [...photos, ...updatedPhotos];
        const uniquePhotos = Array.from(
          new Map(
            mergedPhotos.map((photo: Photo) => [photo.id, photo])
          ).values()
        );

        setPhotos(uniquePhotos);

        localStorage.setItem("photos", JSON.stringify(uniquePhotos));
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
      setIsLoading(false);
    };

    loadPhotos();
  }, [page, showFavorites]);

  // fetches more photos on a scroll

  useEffect(() => {
    if (showFavorites) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1);
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

  // handles favorite photos

  const handleFavoritePhoto = (id: number) => {
    const updatedPhotos = photos.map((photo) =>
      photo.id === id ? { ...photo, liked: !photo.liked } : photo
    );
    setPhotos(updatedPhotos);
    localStorage.setItem("photos", JSON.stringify(updatedPhotos));
  };

  const displayedPhotos = showFavorites
    ? photos.filter((photo) => photo.liked)
    : photos;

  return (
    <div className="gallery-wrapper">
      <div className="photo-gallery">
        {displayedPhotos.map((photo) => (
          <div
            className="photo-card"
            key={`photo-${photo.id}`}
            onClick={() => handleFavoritePhoto(photo.id)}
          >
            <Card data={photo} />
          </div>
        ))}

        {!showFavorites && (
          <div ref={triggerFetchRef} style={{ height: "20px" }} />
        )}
        {isLoading && !showFavorites && (
          <div>
            <span className="loader"></span>
          </div>
        )}
        {showFavorites && displayedPhotos.length === 0 && (
          <div className="no-favorites-wrapper">
            <div className="icon">
              <img src="/src/assets/camera-icon.png" alt="photo icon" />
            </div>
            <div className="no-favorites-text">No favorites yet</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoGallery;
