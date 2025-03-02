import { useEffect, useState } from "react";
import { Photo } from "../model/IPhoto";
import fetchPhotos from "../plugins/fetchPhotos";
import Card from "./card";

function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await fetchPhotos();

        setPhotos(data.photos);
        console.log(data.photos);

        setIsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    loadPhotos();
  }, []);

  return (
    <div className="photo-gallery">
      {photos.map((photo) => {
        return (
          <div className="photo-card" key={photo.id}>
            <Card data={photo} />
          </div>
        );
      })}
    </div>
  );
}

export default PhotoGallery;
