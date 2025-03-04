import { useEffect, useRef, useState } from "react";
import { Photo } from "../model/IPhoto";
import fetchPhotos from "../plugins/fetchPhotos";
import Card from "./card";

function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const triggerFetchRef = useRef<HTMLDivElement | null>(null);
  const [isFavoriteActive, setIsFavoriteActive] = useState<boolean>(true);

  useEffect(() => {
    const savedPhotosJson = localStorage.getItem("photos");
    if (savedPhotosJson) {
      setPhotos(JSON.parse(savedPhotosJson));
    }
  }, []);

  useEffect(() => {
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
  }, [page]);

  const handleFavoritePhoto = (id: number) => {
    const updatedPhotos = photos.map(photo =>
      photo.id === id ? { ...photo, liked: !photo.liked } : photo
    );
    setPhotos(updatedPhotos);
    localStorage.setItem("photos", JSON.stringify(updatedPhotos));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage(prevPage => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (triggerFetchRef.current) {
      observer.observe(triggerFetchRef.current);
    }

    return () => {
      if (triggerFetchRef.current) {
        observer.unobserve(triggerFetchRef.current);
      }
    };
  }, [isLoading]);

  // **Correctly filter favorite photos**
  const favoritePhotos = photos.filter(photo => photo.liked);

  return (
    <div className="photo-gallery">
      <button onClick={() => setIsFavoriteActive(!isFavoriteActive)}>
        {isFavoriteActive ? "Show All Photos" : "Show Favorites"}
      </button>

      <div className="photo-gallery">
        {(isFavoriteActive ? favoritePhotos : photos).map(photo => (
          <div
            className="photo-card"
            key={`photo-${photo.id}`}
            onClick={() => handleFavoritePhoto(photo.id)}
          >
            <Card data={photo} />
          </div>
        ))}
      </div>

      <div ref={triggerFetchRef} style={{ height: "20px" }} />
      {/* {isLoading && <p>Loading...</p>} */}
    </div>
  );
}

export default PhotoGallery;
