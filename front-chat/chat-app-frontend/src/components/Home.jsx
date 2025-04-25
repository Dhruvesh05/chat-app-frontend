import { useState } from "react";
import { useChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const baseURL = "http://localhost:8080"; // Backend URL

const Home = () => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const { setRoomId, setUsername, setConnected } = useChatContext();
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!room || !name) {
      toast.error("Enter both Room ID and Username!");
      return;
    }

    try {
      await axios.get(`${baseURL}/api/v1/rooms/${room}`);
      setRoomId(room);
      setUsername(name);
      setConnected(true);
      toast.success("Joined Room!");
      navigate("/chat");
    } catch {
      toast.error("Room not found!");
    }
  };

  const handleCreate = async () => {
    if (!room || !name) {
      toast.error("Enter both Room ID and Username!");
      return;
    }

    try {
      await axios.post(`${baseURL}/api/v1/rooms`, { roomId: room });
      setRoomId(room);
      setUsername(name);
      setConnected(true);
      toast.success("Room Created!");
      navigate("/chat");
    } catch {
      toast.error("Room already exists!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Chat App</h1>
      <input className="p-2 mt-3 text-black" placeholder="Enter Username" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="p-2 mt-3 text-black" placeholder="Enter Room ID" value={room} onChange={(e) => setRoom(e.target.value)} />
      <button className="p-2 mt-3 bg-blue-500 rounded" onClick={handleJoin}>Join Room</button>
      <button className="p-2 mt-3 bg-green-500 rounded" onClick={handleCreate}>Create Room</button>
    </div>
  );
};

export default Home;
