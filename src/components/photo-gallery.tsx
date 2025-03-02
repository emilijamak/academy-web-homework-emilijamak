import { useEffect, useRef, useState } from "react";
import { Photo } from "../model/IPhoto";
import fetchPhotos from "../plugins/fetchPhotos";
import Card from "./card";

function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const triggerFetchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      const savedPhotos = localStorage.getItem("photos");
      if (savedPhotos) {
        setPhotos(JSON.parse(savedPhotos));
      }

      setIsLoading(true);
      try {
        const newPhotos = await fetchPhotos("curated", {
          per_page: "16",
          page: page.toString(),
        });

        const newUniquePhotos = newPhotos.filter((newPhoto: Photo) => !photos.some((photo) => photo.id === newPhoto.id));

        setPhotos((prevPhotos) => [
          ...prevPhotos,
          ...newUniquePhotos
        ])

        
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    loadPhotos();
  }, [page]);

  useEffect(() => {
    localStorage.setItem("photos", JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1);
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

  const handleFavoritePhoto = (id: number) => {
    const updatedPhotos = photos.map((photo) =>
      photo.id === id ? { ...photo, liked: !photo.liked } : photo
    );
    setPhotos(updatedPhotos);
    localStorage.setItem("photos", JSON.stringify(updatedPhotos));
  };

  return (
    <div className="photo-gallery">
      {photos.map((photo, index) => (
        <div
          className="photo-card"
          key={index}
          onClick={() => handleFavoritePhoto(photo.id)}
        >
          <Card data={photo} />
        </div>
      ))}
      <div ref={triggerFetchRef} style={{ height: "20px" }} />
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default PhotoGallery;
