import React, { useEffect, useRef, useState } from "react";
import { MdSend, MdEmojiEmotions, MdMoreVert, MdArrowBack } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import { getMessagess } from "../services/RoomService";
import "./ChatPage.css";

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
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);


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
        toast.success("Connected to chat");

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
      setShowEmojiPicker(false);
      inputRef.current?.focus();
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
    inputRef.current?.focus();
  };

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach((message) => {
      const date = new Date(message.timeStamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="chat-page">
      {/* Header */}
      <header className="chat-header">
        <div className="header-left">
          <button onClick={handleLogout} className="back-button">
            <MdArrowBack />
          </button>
          <div className="room-avatar">
            <div className="avatar-circle">
              {roomId.substring(0, 2).toUpperCase()}
            </div>
          </div>
          <div className="room-details">
            <h2 className="room-name">Room {roomId}</h2>
            <p className="room-status">
              {messages.length} messages
            </p>
          </div>
        </div>
        <div className="header-right">
          <button 
            className="menu-button"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MdMoreVert />
          </button>
          {showMenu && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Leave Room</button>
              <button onClick={() => setShowMenu(false)}>Close</button>
            </div>
          )}
        </div>
      </header>

      {/* Chat Messages */}
      <main ref={chatBoxRef} className="chat-messages">
        <div className="messages-container">
          {Object.entries(groupedMessages).map(([date, msgs]) => (
            <div key={date} className="message-group">
              <div className="date-divider">
                <span>{date === new Date().toLocaleDateString() ? "Today" : date}</span>
              </div>
              {msgs.map((message, index) => {
                const isSent = message.sender === currentUser;
                const showAvatar = index === 0 || msgs[index - 1].sender !== message.sender;
                
                return (
                  <div 
                    key={index} 
                    className={`message-wrapper ${isSent ? "sent" : "received"}`}
                  >
                    {!isSent && showAvatar && (
                      <div className="message-avatar">
                        {message.sender.substring(0, 1).toUpperCase()}
                      </div>
                    )}
                    {!isSent && !showAvatar && <div className="message-avatar-spacer" />}
                    
                    <div className="message-bubble">
                      {!isSent && showAvatar && (
                        <p className="message-sender">{message.sender}</p>
                      )}
                      <p className="message-text">{message.content}</p>
                      <span className="message-time">
                        {new Date(message.timeStamp).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </main>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="emoji-picker-overlay" onClick={() => setShowEmojiPicker(false)}>
          <div className="emoji-picker-container" onClick={(e) => e.stopPropagation()}>
            <EmojiPicker 
              onEmojiClick={handleEmojiClick}
              width="100%"
              height="400px"
            />
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="chat-input-wrapper">
        <div className="chat-input-container">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="input-icon-button emoji-button"
            title="Add emoji"
          >
            <MdEmojiEmotions />
          </button>

          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Type a message..."
            className="message-input"
          />

          <button 
            onClick={sendMessage} 
            className="send-button"
            disabled={!input.trim()}
            title="Send message"
          >
            <MdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;