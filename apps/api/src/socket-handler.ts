import { log } from "@repo/logger";
import { type Socket } from "socket.io";
import { getRandomIteration } from "./services/iterations";

export default function socketHandler(socket: Socket): void {
  log(`User ${socket.id} has connected!`);

  // Generates requirements if user asks for it
  socket.on("requirement", () => {
    log(`Generate requirements`);
  });

  // Sends a request to the user to give its current stats
  setInterval(
    () => {
      socket.emit("give-stats");
    },
    Math.floor(Math.random() * 40000) + 10000
  );

  // Receives the stats from the user
  socket.on("update", async (data) => {
    const response = await getRandomIteration(
      data.requirement,
      data.architectureDescription
    );
    socket.emit("new-iteration", response);
  });

  socket.on("disconnect", () => {
    log(`user disconnected ${socket.id}`);
  });
}
