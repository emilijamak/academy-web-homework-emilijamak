import { Photo } from "../model/IPhoto";
import { useEffect, useState, useRef } from "react";

interface CardProps {
  data: Photo;
}

function Card({ data }: CardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const extractTitleFromUrl = (url: string): string => {
    const match = url.match(/photo\/([^/]+)/);
    if (match) {
      let title = match[1]
        .replace(/-/g, " ")
        .replace(/\d+$/, "")
        .trim();

      return title.charAt(0).toUpperCase() + title.slice(1);
    }
    return "Untitled Image";
  };



  const title =
    data.alt && data.alt.length <= 50 ? data.alt : extractTitleFromUrl(data.url);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: 0.5, 
        rootMargin: "100px" 
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

  return (
    <div 
      ref={cardRef}
      className="w-full h-full group shadow-[4px_4px_5px_rgb(0,0,0,0.3)]"
    >
      <div 
        className={`relative overflow-hidden rounded-md h-full ${
          !isLoaded ? "blur-sm bg-gray-200" : ""
        }`}
        style={{
          backgroundColor: !isLoaded ? "#e5e7eb" : "transparent",
          transition: "filter 0.3s ease-out"
        }}
      >

        {isInView && (
          <img
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            src={data.src.large2x}
            alt={title}
            onLoad={() => setIsLoaded(true)}
            style={{ position: isLoaded ? "relative" : "absolute" }}
          />
        )}

        <div className="absolute text-white top-0 left-0 h-full w-full bg-black/20 flex flex-col items-center p-8 justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="filler"></div>
          <div className="flex flex-col justify-center items-center">
            <div className="font-bold text-title text-center">{title}</div>
            <hr className="my-1 h-[2.5px] w-[55%] rounded-md border-t-0 bg-neutral-100 dark:bg-white" />
            <div className="text-photographer italic">{data.photographer}</div>
          </div>

          <div className="btn favorite-btn font-medium mt-3 border border-white/60 py-2 px-12 rounded-full cursor-pointer hover:bg-white/20">
            {!data.liked ? 'Favorite' : 'Unfavorite'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;