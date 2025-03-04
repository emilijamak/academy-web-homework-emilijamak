import { useState } from "react";
import "./App.css";
import PhotoGallery from "./components/photo-gallery";
import Navbar from "./components/navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      <Navbar/>
      <div className="mx-auto p-3">
      <PhotoGallery />
      </div>
    </div>
  );
}

export default App;
