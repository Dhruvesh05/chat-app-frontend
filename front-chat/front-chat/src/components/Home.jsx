import { useState } from "react";
import { useChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Box, Button, Container, TextField, Typography, Paper } from "@mui/material";

const baseURL = "http://localhost:8080";

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
      toast.success(`Joined Room: ${room}`);
      navigate("/chat"); // ✅ Navigate to chat room
    } catch {
      toast.error("Room not found!");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={5} sx={{ padding: 4, textAlign: "center", background: "#1E293B", color: "white" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Chat App
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter Username"
          sx={{ marginBottom: 2, backgroundColor: "white" }}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter Room ID"
          sx={{ marginBottom: 2, backgroundColor: "white" }}
          onChange={(e) => setRoom(e.target.value)}
        />
        <Button fullWidth variant="contained" color="primary" onClick={handleJoin}>
          Join Room
        </Button>
      </Paper>
    </Container>
  );
};

export default Home;
