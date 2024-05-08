import "./App.css";

import Home from "./Pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Edit from "./Pages/Edit";
import movieData from "./movieData";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/edit" element={<Edit movieData={movieData} />} />
      </Routes>
    </div>
  );
}

export default App;
