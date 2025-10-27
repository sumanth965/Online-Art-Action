import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dummyy from "./dummyy/dummyy";
import ArtistDashboard from "./pages/ArtistDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/a" element={<Dummyy />} />
        <Route path="/" element={<ArtistDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
