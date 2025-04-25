import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Room from './Room.jsx';
import Chat from "./Chat";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Room />} />
        <Route path="/chat/:roomID" element={<Chat />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
