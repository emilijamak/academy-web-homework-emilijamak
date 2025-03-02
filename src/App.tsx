import { useState } from 'react'
import './App.css'
import PhotoGallery from './components/photo-gallery'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='mx-auto p-3'>
    <PhotoGallery/>
    </div>
  )
}

export default App
