import React from "react";
import { Routes, Route } from "react-router";
import Home from "../components/home";
import ChatPage from "../components/ChatPage";
import JoinCreateChat from "../components/JoinCreateChat";
import About from "../components/About";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/join-create" element={<JoinCreateChat />} />
      <Route path="/help" element={<h1 style={{textAlign:'center',marginTop:'2rem'}}>Help: For any issues, contact support@example.com</h1>} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<h1 style={{textAlign:'center',marginTop:'2rem'}}>404 Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;