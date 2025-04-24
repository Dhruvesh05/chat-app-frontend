import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);

  return (
    <ChatContext.Provider value={{ roomId, setRoomId, username, setUsername, connected, setConnected }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
