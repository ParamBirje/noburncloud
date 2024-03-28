import { log } from "@repo/logger";
import { type Socket } from "socket.io";

export default function socketHandler(socket: Socket) {
  log(`User ${socket.id} has connected!`);

  socket.on("disconnect", () => {
    log(`user disconnected ${socket.id}`);
  });
}
