import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const socket = new SockJS("https://chat-app-backend-qmgt.onrender.com/chat");

const stompClient = new Client({
  webSocketFactory: () => socket,
  reconnectDelay: 5000,
  debug: (str) => console.log(str),
  onConnect: () => {
    console.log("✅ Connected to WebSocket");

    // Example subscription to room
    stompClient.subscribe("/topic/room/room123", (message) => {
      const msg = JSON.parse(message.body);
      console.log("📩 Message received:", msg);
    });

    // Example sending a message
    stompClient.publish({
      destination: "/app/sendMessage/room123",
      body: JSON.stringify({
        sender: "Dhruvesh",
        content: "Hello from frontend!",
        roomId: "room123",
      }),
    });
  },
  onStompError: (frame) => {
    console.error("🔴 Broker Error:", frame.headers["message"]);
  },
});

export const connectSocket = () => {
  stompClient.activate();
};

export const disconnectSocket = () => {
  stompClient.deactivate();
};
