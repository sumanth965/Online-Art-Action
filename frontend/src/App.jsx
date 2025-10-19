import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dummyy from "./dummyy/dummyy";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dummyy />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
