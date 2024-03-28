import http from "http";
import { Server } from "socket.io";
import { log } from "@repo/logger";
import { createServer } from "./server";

const port = process.env.PORT || 5001;
const app = createServer();

// Socket.io setup
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (_req, res) => {
  return res.json({
    message: "Hello, this is the backend.",
  });
});

io.on("connection", (socket) => {
  log(`User ${socket.id} has connected!`);
});

server.listen(port, () => {
  log(`API running on http://localhost:${port}`);
});
