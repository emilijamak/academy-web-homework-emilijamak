import { use, useState } from "react";
import "./App.css";
import PhotoGallery from "./components/photo-gallery";
import Navbar from "./components/navbar";

function App() {
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('')
  
  const handleFavorites = (value: boolean) => {
    console.log('clicked', value);
    setShowFavorites(value);
  };
  
  return (
    <div className="">
      <Navbar handleFavorites={handleFavorites} />
      <div className="mx-auto p-3">
      <PhotoGallery showFavorites={showFavorites} />
      </div>
    </div>
  );
}

export default App;