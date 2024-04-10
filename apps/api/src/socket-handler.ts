import { log } from "@repo/logger";
import { type Socket } from "socket.io";

export default function socketHandler(socket: Socket): void {
  log(`User ${socket.id} has connected!`);

  // Generates requirements if user asks for it
  socket.on("requirement", () => {
    log(`Generate requirements`);
  });

  setInterval(
    () => {
      socket.emit("update", Math.random());
    },
    Math.floor(Math.random() * 40000) + 10000
  );

  socket.on("disconnect", () => {
    log(`user disconnected ${socket.id}`);
  });
}
