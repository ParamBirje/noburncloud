import { log } from "@repo/logger";
import { type Socket } from "socket.io";
import { getRandomCloudError, getRandomIteration } from "./services/iterations";

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
    Math.floor(Math.random() * 40000) + 120000
  );

  // Receives the stats from the user
  socket.on("update", async (data) => {
    let response = await getRandomIteration(
      data.requirement,
      data.architectureDescription
    );

    // Slicing title and desc
    const semicolonIndex = response.indexOf("|");

    const iteration = {
      title: response.slice(0, semicolonIndex).replace(/\*/g, ""),
      description: response.slice(semicolonIndex + 1).replace(/\*/g, ""),
    };

    socket.emit("new-iteration", iteration);
  });

  // Sends a request to the user to give its current architecture description
  setInterval(
    () => {
      socket.emit("give-architecture");
    },
    Math.floor(Math.random() * 40000) + 200000
  );

  // Receives the architecture description from the user
  socket.on("update-architecture", async (data) => {
    const response = await getRandomCloudError(data.architectureDescription);

    socket.emit("new-notification", response);
  });

  socket.on("disconnect", () => {
    log(`user disconnected ${socket.id}`);
  });
}
