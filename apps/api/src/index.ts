import http from "http";
import { Server } from "socket.io";
import { log } from "@repo/logger";
import { createServer } from "./server";
import socketHandler from "./socket-handler";

const port = process.env.PORT || 5001;
const app = createServer();

// Socket.io setup
const server = http.createServer(app);
const io: Server = new Server(server);

io.on("connection", socketHandler);

app.get("/", (_req, res) => {
  return res.json({
    message: "Hello, this is the backend.",
  });
});

server.listen(port, () => {
  log(`API running on http://localhost:${port}`);
});
