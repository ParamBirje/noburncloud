import { log } from "@repo/logger";
import { type Socket } from "socket.io";
import { getRandomCloudError, getRandomIteration } from "./services/iterations";

const defaultPlayerStats = {
  users: 1.02,
  billingCost: 0,
  satisfaction: 100,
};

// in seconds
const updatePlayerStatsDelay = 14;
const sendCloudErrorBaseDelay = 200;
const sendIterationBaseDelay = 120;

export default function socketHandler(socket: Socket): void {
  log(`User ${socket.id} has connected!`);

  // Initialising player's stats
  let playerStats = defaultPlayerStats;

  // Generates requirements if user asks for it
  socket.on("requirement", () => {
    log(`Generate requirements`);
  });

  // Sends a request to the user to give its current stats
  setInterval(
    () => {
      socket.emit("give-stats");
    },
    Math.floor(Math.random() * 40000) + sendIterationBaseDelay * 1000
  );

  // Receives the stats from the user
  socket.on("update", async (data) => {
    const response = await getRandomIteration(
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
    Math.floor(Math.random() * 40000) + sendCloudErrorBaseDelay * 1000
  );

  // Receives the architecture description from the user
  socket.on("update-architecture", async (data) => {
    const response = await getRandomCloudError(data.architectureDescription);

    // Decrease users by 15% and decrease satisfaction by anywhere from 5-10
    playerStats.users = 0.85;
    playerStats.satisfaction -= Math.floor(Math.random() * 5) + 5;

    socket.emit("new-notification", response);
    socket.emit("send-stats", playerStats);
  });

  // Sends the default stats to the user every time interval
  setInterval(() => {
    playerStats = {
      users: defaultPlayerStats.users,
      billingCost: playerStats.billingCost,
      satisfaction: playerStats.satisfaction,
    };
    socket.emit("send-stats", playerStats);
  }, updatePlayerStatsDelay * 1000);

  // When user removes an iteration, decrease satisfaction
  socket.on("dismiss-iteration", () => {
    log(`User ${socket.id} has dismissed an iteration`);
    playerStats.satisfaction -= Math.floor(Math.random() * 5) + 1;
    playerStats.users = 0.92; // Decrease users by 8%
    socket.emit("send-stats", playerStats);
  });

  // When user integrates an iteration, increase satisfaction
  socket.on("integrate-iteration", () => {
    playerStats.satisfaction += Math.floor(Math.random() * 5) + 2;
    playerStats.users = 1.1; // Increase users by 10%
    socket.emit("send-stats", playerStats);
  });

  socket.on("disconnect", () => {
    log(`user disconnected ${socket.id}`);
  });
}
