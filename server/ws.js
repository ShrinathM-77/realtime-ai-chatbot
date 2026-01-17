import { WebSocketServer } from "ws";
import { streamAIResponse } from "./aiStream.js";

export function initWebSocket(server) {
  const wss = new WebSocketServer({ server });
  console.log("🚀 WebSocket server initialized");

  wss.on("connection", (ws) => {
    console.log("✅ Client connected");

    ws.isAlive = true;

    // Ping-pong heartbeat to avoid disconnects
    ws.on("pong", () => (ws.isAlive = true));

    ws.on("message", async (message) => {
      let data;
      try {
        data = JSON.parse(message.toString());
      } catch {
        ws.send(JSON.stringify({ type: "error", message: "Invalid message format" }));
        return;
      }

      if (!data.content) {
        ws.send(JSON.stringify({ type: "error", message: "No content provided" }));
        return;
      }

      try {
        // Start AI streaming safely
        await streamAIResponse(data.content, ws);
      } catch (err) {
        console.error("AI streaming error:", err);
        ws.send(JSON.stringify({ type: "error", message: "Something went wrong" }));
      }
    });

    ws.on("close", () => console.log("❌ Client disconnected"));
  });

  // Heartbeat to keep connections alive
  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (!ws.isAlive) return ws.terminate();
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wss.on("close", () => clearInterval(interval));
}
