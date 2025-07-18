import React, { useState } from "react";
import chatIcon from "../assets/image.png";
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import "./JoinCreateChat.css"; // Import the new CSS file

const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const { setRoomId, setCurrentUser, setConnected } = useChatContext();
  const navigate = useNavigate();

  const handleFormInputChange = (event) => {
    setDetail((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = () => {
    if (!detail.roomId.trim() || !detail.userName.trim()) {
      toast.error("Room ID and Username are required!");
      return false;
    }
    return true;
  };

  const joinChat = async () => {
    if (!validateForm()) return;

    try {
      const room = await joinChatApi(detail.roomId);
      toast.success("Joined Room Successfully!");
      setCurrentUser(detail.userName);
      setRoomId(room.roomId);
      setConnected(true);
      navigate("/chat");
    } catch (error) {
      toast.error("Error in joining room. Please try again.");
      console.error(error);
    }
  };

  const createRoom = async () => {
    if (!validateForm()) return;

    try {
      const response = await createRoomApi(detail.roomId);
      toast.success("Room Created Successfully!");
      setCurrentUser(detail.userName);
      setRoomId(response.roomId);
      setConnected(true);
      navigate("/chat");
    } catch (error) {
      toast.error("Error creating room. Please try again.");
      console.error(error);
    }
  };

  return (
    <body>
    <div className="join-create-container">
      <div className="join-create-card">
        <img src={chatIcon} className="chat-logo" alt="Chat Icon" />
        <h1 className="join-create-title">Welcome to Chat Room</h1>

        {/* Name Input */}
        <div className="input-group">
          <label htmlFor="userName">Your Name</label>
          <input
            onChange={handleFormInputChange}
            value={detail.userName}
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter your name"
            className="input-field"
          />
        </div>

        {/* Room ID Input */}
        <div className="input-group">
          <label htmlFor="roomId">Room ID / New Room ID</label>
          <input
            name="roomId"
            onChange={handleFormInputChange}
            value={detail.roomId}
            type="text"
            id="roomId"
            placeholder="Enter room ID"
            className="input-field"
          />
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button onClick={joinChat} className="join-button">Join Room</button>
          <button onClick={createRoom} className="create-button">Create Room</button>
        </div>
      </div>
    </div>
    </body>
  );
};

export default JoinCreateChat;
