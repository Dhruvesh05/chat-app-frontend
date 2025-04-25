import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend, MdEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import { getMessagess } from "../services/RoomService";
import { timeAgo } from "../config/helper";
import "./ChatPage.css"; // Import the new CSS file

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();

  const navigate = useNavigate();
  const chatBoxRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Redirect if not connected
  useEffect(() => {
    if (!connected || !roomId || !currentUser) {
      navigate("/");
    }
  }, [connected, roomId, currentUser, navigate]);

  // Load chat history
  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessagess(roomId);
        setMessages(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to load messages.");
      }
    }

    if (connected && roomId) {
      loadMessages();
    }
  }, [roomId, connected]);

  // WebSocket connection
  useEffect(() => {
    let client;

    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }

    return () => {
      if (client) {
        client.disconnect();
        console.log("WebSocket Disconnected");
      }
    };
  }, [roomId, connected]);

  // Auto-scroll chat box
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Send Message
  const sendMessage = async () => {
    if (!stompClient) {
      toast.error("WebSocket not connected.");
      return;
    }

    if (connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };

      stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
      setInput("");
    }
  };

  // Logout
  function handleLogout() {
    if (stompClient) {
      stompClient.disconnect();
    }
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  }

  // Add emoji to input
  const handleEmojiClick = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1 className="room-info">Room :  {roomId}</h1>
        <h1 className="user-info">User :  {currentUser}</h1>
        <button onClick={handleLogout} className="leave-button">
          Leave Room
        </button>
      </header>

      <main ref={chatBoxRef} className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === currentUser ? "sent" : "received"}`}>
            <div className="message-content">
              <p className="message-user">{message.sender}</p>
              <p className="message-text">{message.content}</p>
              <p className="message-time">{timeAgo(message.timeStamp)}</p>
            </div>
          </div>
        ))}
      </main>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="emoji-picker">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <div className="message-input-container">
        {/* Emoji Button */}
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="emoji-button"
        >
          <MdEmojiEmotions />
        </button>

        {/* Input Field */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="message-input"
        />

        {/* Send Button */}
        <button onClick={sendMessage} className="send-button">
          <MdSend />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
