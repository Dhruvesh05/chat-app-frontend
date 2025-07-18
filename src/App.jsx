import React, { useEffect } from "react";
import { connectSocket, disconnectSocket } from "./services/socket";

function App() {
  useEffect(() => {
    connectSocket(); // connect when component mounts

    return () => {
      disconnectSocket(); // cleanup on unmount
    };
  }, []);

  return (
    <div>
      <h1>🧠 C3ube Chat App</h1>
      <p>Check the console for WebSocket activity.</p>
    </div>
  );
}

export default App;
