import { useState } from "react";
import "./App.css";
import PhotoGallery from "./components/photo-gallery";
import Navbar from "./components/navbar";

function App() {
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const handleFavorites = (value: boolean) => {
    setShowFavorites(value);
  };

  return (
    <div className="">
      <Navbar handleFavorites={handleFavorites} />
      <PhotoGallery showFavorites={showFavorites} />
    </div>
  );
}

export default App;
