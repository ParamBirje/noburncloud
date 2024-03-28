import { log } from "@repo/logger";
import { type Socket } from "socket.io";

export default function socketHandler(socket: Socket) {
  log(`User ${socket.id} has connected!`);

  // Generates requirements if user asks for it
  socket.on("requirement", () => {
    log(`Generate requirements`);
  });

  socket.on("disconnect", () => {
    log(`user disconnected ${socket.id}`);
  });
}
