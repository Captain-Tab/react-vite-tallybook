import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Index from './view/index'
import About from "./view/about";

function App() {
  return <BrowserRouter>
    <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
}

export default App
