import { log } from "@repo/logger";
import { type Socket } from "socket.io";
import { getRandomCloudError, getRandomIteration } from "./services/iterations";

export default function socketHandler(socket: Socket): void {
  log(`User ${socket.id} has connected!`);

  // Initialising player's stats
  let playerStats = {
    users: 0,
    billingCost: 0,
    satisfaction: 100,
  };

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

  // When user removes an iteration, decrease satisfaction
  socket.on("dismiss-iteration", () => {
    playerStats.satisfaction -= Math.floor(Math.random() * 5);
    playerStats.users = 1.01; // Increase users by 1%
    socket.emit("send-stats", playerStats);
  });

  // When user integrates an iteration, increase satisfaction
  socket.on("integrate-iteration", () => {
    playerStats.satisfaction += Math.floor(Math.random() * 5);
    playerStats.users = 1.08; // Increase users by 8%
    socket.emit("send-stats", playerStats);
  });

  socket.on("disconnect", () => {
    log(`user disconnected ${socket.id}`);
  });
}
