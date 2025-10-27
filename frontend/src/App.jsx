import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dummyy from "./dummyy/dummyy";
import ArtistDashboard from "./pages/artist/ArtistDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dummyy />} />
        <Route path="/a" element={<ArtistDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
