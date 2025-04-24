import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ChatRoom from "./components/ChatRoom";
import { ChatProvider } from "./context/ChatContext";

const App = () => (
  <ChatProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  </ChatProvider>
);

export default App;
