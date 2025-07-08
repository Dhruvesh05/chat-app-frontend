import { useEffect, useState, useRef } from "react";
import { useChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import toast from "react-hot-toast";
import axios from "axios";

const baseURL = "https://chat-app-backend-qmgt.onrender.com"; // Render-deployed Backend URL


const ChatRoom = () => {
  const { roomId, username, connected, setConnected } = useChatContext();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const stompClientRef = useRef(null);

  useEffect(() => {
    if (!connected) navigate("/");
    
    const fetchMessages = async () => {
      const response = await axios.get(`${baseURL}/api/v1/rooms/${roomId}/messages`);
      setMessages(response.data);
    };
    fetchMessages();

    const socket = new SockJS(`${baseURL}/chat`);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClientRef.current = stompClient;
      stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
        setMessages((prev) => [...prev, JSON.parse(message.body)]);
      });
    });

    return () => stompClient.disconnect();
  }, [roomId, connected, navigate]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const message = { sender: username, content: input, roomId };
    stompClientRef.current.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
    setInput("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-xl">Room: {roomId}</h1>
      <div className="w-full max-w-md p-5 bg-gray-800 rounded-lg h-96 overflow-auto">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 bg-gray-700 rounded my-2">
            <b>{msg.sender}:</b> {msg.content}
          </div>
        ))}
      </div>
      <input className="p-2 mt-3 text-black" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
      <button className="p-2 mt-3 bg-blue-500 rounded" onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
