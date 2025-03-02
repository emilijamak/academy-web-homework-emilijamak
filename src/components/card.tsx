import { Photo } from "../model/IPhoto";

interface CardProps {
  data: Photo; // Accept a single photo as data prop
}

function Card({ data }: CardProps) {
  // Function to extract and format title from URL
  const extractTitleFromUrl = (url: string): string => {
    const match = url.match(/photo\/([^/]+)/);
    if (match) {
      let title = match[1]
        .replace(/-/g, " ") // Replace dashes with spaces
        .replace(/\d+$/, "") // Remove trailing numbers
        .trim(); // Trim any remaining spaces

      return title.charAt(0).toUpperCase() + title.slice(1); // Capitalize first letter
    }
    return "Untitled Image"; // Default fallback
  };

  // Determine the title: Prefer data.alt if it's valid, otherwise use extracted title
  const title =
    data.alt && data.alt.length <= 50 ? data.alt : extractTitleFromUrl(data.url);

  return (
    <div className="w-full h-full group shadow-[4px_4px_5px_rgb(0,0,0,0.3)]">
      <div className="relative overflow-hidden rounded-md h-full ">
        <img
          className="h-full w-full object-cover "
          src={data.src.large2x}
          alt={title}
        />
        <div className="absolute text-white top-0 left-0 h-full w-full bg-black/20 flex flex-col items-center p-8 justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="filler"></div>
          <div className="flex flex-col justify-center items-center">
            <div className="font-bold text-title text-center">{title}</div>
            <hr className="my-1 h-[2.5px] w-[55%] rounded-md border-t-0 bg-neutral-100 dark:bg-white" />
            <div className="text-photographer italic">{data.photographer}</div>
          </div>

          <div className="btn favorite-btn font-medium mt-3 border border-white/60 py-2 px-12 rounded-full cursor-pointer hover:bg-white/20">
            Favorite
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
