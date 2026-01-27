
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useChatContext from "../context/ChatContext";
import toast from "react-hot-toast";
import axios from "axios";
import "./JoinCreateChat.css";


const baseURL = "https://chat-app-backend-qmgt.onrender.com";

const JoinCreateChat = () => {
  // Shared state for both cards
  const [joinName, setJoinName] = useState("");
  const [joinRoom, setJoinRoom] = useState("");
  const [createName, setCreateName] = useState("");
  const [createRoom, setCreateRoom] = useState("");
  const { setRoomId, setCurrentUser, setConnected } = useChatContext();
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!joinRoom || !joinName) {
      toast.error("Enter both Room ID and Username!");
      return;
    }
    try {
      await axios.get(`${baseURL}/api/v1/rooms/${joinRoom}`);
      setRoomId(joinRoom);
      setCurrentUser(joinName);
      setConnected(true);
      toast.success("Joined Room!");
      navigate("/chat");
    } catch {
      toast.error("Room not found!");
    }
  };

  const handleCreate = async () => {
    if (!createRoom || !createName) {
      toast.error("Enter both Room ID and Username!");
      return;
    }
    try {
      await axios.post(`${baseURL}/api/v1/rooms`, { roomId: createRoom });
      setRoomId(createRoom);
      setCurrentUser(createName);
      setConnected(true);
      toast.success("Room Created!");
      navigate("/chat");
    } catch {
      toast.error("Room already exists!");
    }
  };

  return (
    <section className="join-create-section">
      <div className="join-create-container">
        <div className="section-header">
          <h2 className="section-title">Ready to get started?</h2>
          <p className="section-subtitle">Join an existing room or create your own in seconds</p>
        </div>
        <div className="cards-grid">
          {/* Join Room Card */}
          <div className="action-card join-card">
            <div className="card-icon join-icon">
              <svg
                className="responsive-svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="card-title">Join a Room</h3>
            <p className="card-description">
              Enter a room code to connect with others instantly
            </p>
            <input
              className="card-input enhanced-input"
              type="text"
              placeholder="👤 Username (e.g. JohnDoe)"
              value={joinName}
              onChange={e => setJoinName(e.target.value)}
              style={{
                marginBottom: 12,
                padding: '12px',
                borderRadius: '8px',
                border: '1.5px solid #4f8cff',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(79,140,255,0.08)'
              }}
              autoComplete="off"
              maxLength={32}
            />
            <input
              className="card-input enhanced-input"
              type="text"
              placeholder="#️⃣ Room ID (e.g. room123)"
              value={joinRoom}
              onChange={e => setJoinRoom(e.target.value)}
              style={{
                marginBottom: 16,
                padding: '12px',
                borderRadius: '8px',
                border: '1.5px solid #4f8cff',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(79,140,255,0.08)'
              }}
              autoComplete="off"
              maxLength={32}
            />
            <button
              className="card-button join-button"
              onClick={handleJoin}
              style={{ width: '100%', minHeight: 44, fontWeight: 600, fontSize: '1rem' }}
            >
              Join Now
            </button>
          </div>
          {/* Create Room Card */}
          <div className="action-card create-card">
            <div className="card-icon create-icon">
              <svg
                className="responsive-svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="card-title">Create a Room</h3>
            <p className="card-description">
              Start a new conversation and invite your team
            </p>
            <input
              className="card-input enhanced-input"
              type="text"
              placeholder="👤 Username (e.g. JohnDoe)"
              value={createName}
              onChange={e => setCreateName(e.target.value)}
              style={{
                marginBottom: 12,
                padding: '12px',
                borderRadius: '8px',
                border: '1.5px solid #4f8cff',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(79,140,255,0.08)'
              }}
              autoComplete="off"
              maxLength={32}
            />
            <input
              className="card-input enhanced-input"
              type="text"
              placeholder="#️⃣ Room ID (e.g. room123)"
              value={createRoom}
              onChange={e => setCreateRoom(e.target.value)}
              style={{
                marginBottom: 16,
                padding: '12px',
                borderRadius: '8px',
                border: '1.5px solid #4f8cff',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(79,140,255,0.08)'
              }}
              autoComplete="off"
              maxLength={32}
            />
            <button
              className="card-button create-button"
              onClick={handleCreate}
              style={{ width: '100%', minHeight: 44, fontWeight: 600, fontSize: '1rem' }}
            >
              Create Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCreateChat;