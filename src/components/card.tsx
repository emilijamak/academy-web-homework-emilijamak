import { Photo } from "../model/IPhoto";
import { useEffect, useState, useRef } from "react";

interface CardProps {
  data: Photo;
}

function Card({ data }: CardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const imageData = {
    original: data.src.original,
    large2x: data.src.large2x,
    large: data.src.large,
    medium: data.src.medium,
    small: data.src.small,
    portrait: data.src.portrait,
    landscape: data.src.landscape,
    tiny: data.src.tiny,
  };

  const srcSetString = `
  ${imageData.tiny} 130w,
  ${imageData.small} 130w,
  ${imageData.medium} 350w,
  ${imageData.large} 940w,
  ${imageData.large2x} 1880w,
  ${imageData.portrait} 800w,
  ${imageData.landscape} 1200w,
  ${imageData.original} 2400w
`;

  const sizesString = `
  (min-width: 2088px) 1500px,
  (min-width: 1657px) 1300px,
  (min-width: 1337px) 801px,
  (min-width: 1096px) 801px,
  (min-width: 920px) 801px,
  (min-width: 796px) 1500px,
  100vw
`;

  useEffect(() => {
    // function to check if the card is in the viewport

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.5,
        rootMargin: "100px",
      }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Function to extract the title from the URL

  const extractTitleFromUrl = (url: string): string => {
    const match = url.match(/photo\/([^/]+)/);
    if (match) {
      let title = match[1].replace(/-/g, " ").replace(/\d+$/, "").trim();

      return title.charAt(0).toUpperCase() + title.slice(1);
    }
    return "Untitled Image";
  };

  const title =
    data.alt && data.alt.length <= 50
      ? data.alt
      : extractTitleFromUrl(data.url);

  return (
    <div ref={cardRef} className="card-container">
      <div
        className={`relative ${!isLoaded ? "blur-sm bg-gray-200" : ""}`}
        style={{
          backgroundColor: !isLoaded ? "#e5e7eb" : "transparent",
          transition: "filter 0.3s ease-out",
        }}
      >
        {isInView && (
          <img
            data-testid="card-image"
            className={isLoaded ? "opacity-100 " : "opacity-0"}
            src={imageData.large}
            srcSet={srcSetString}
            sizes={sizesString}
            alt={title}
            onLoad={() => setIsLoaded(true)}
            style={{ position: isLoaded ? "relative" : "absolute" }}
          />
        )}

        <div className="absolute">
          <div className="filler"></div>
          <div className="flex flex-col justify-center items-center">
            <div className="font-bold text-title text-center">{title}</div>
            <hr />
            <div className="text-photographer italic">{data.photographer}</div>
          </div>

          <div className="btn favorite-btn">
            {!data.liked ? "Favorite" : "Unfavorite"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
