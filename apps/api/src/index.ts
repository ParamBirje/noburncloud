import http from "http";
import { Server } from "socket.io";

import { createServer } from "./server";
import socketHandler from "./socket-handler";

import requirementsRouter from "./routes/requirements";
import architectureRouter from "./routes/architecture";
import supportRouter from "./routes/support";

const port = process.env.PORT || 5001;
const app = createServer();

// Socket.io setup
const server = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Routers
app.use("/requirements", requirementsRouter);
app.use("/architecture", architectureRouter);
app.use("/support", supportRouter);

io.on("connection", socketHandler);

app.get("/", (_req, res) => {
  return res.json({
    message: "Hello, this is the backend.",
  });
});

server.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
