import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // 👈 FORCE LOAD

import express from "express";
import http from "http";
import cors from "cors";
import { initWebSocket } from "./ws.js";

const app = express();
app.use(cors());

const server = http.createServer(app);

initWebSocket(server);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
