import { type Socket } from "socket.io";
import { getRandomCloudError, getRandomIteration } from "./services/iterations";
import { getMonthlyBillingCost } from "./services/playerstats";

const defaultPlayerStats = {
  users: 1.06,
  billingCost: 0,
  satisfaction: 100,
};

// in seconds
const updatePlayerStatsDelay = 14;
const sendCloudErrorBaseDelay = 150;
const sendIterationBaseDelay = 90;

// playerStats points
const dismissIterationUsers = 0.9; // Decrease users
const integrateIterationUsers = 1.19; // Increase users
const cloudErrorUsers = 0.65;

export default function socketHandler(socket: Socket): void {
  console.log(`User ${socket.id} has connected!`);

  // Initialising player's stats
  let playerStats = defaultPlayerStats;

  // Generates requirements if user asks for it
  socket.on("requirement", () => {
    console.log(`Generate requirements`);
  });

  // Sends a request to the user to give its current stats
  setInterval(() => {
    socket.emit("give-stats");
  }, Math.floor(Math.random() * 40000) + sendIterationBaseDelay * 1000);

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
  setInterval(() => {
    socket.emit("give-architecture");
  }, Math.floor(Math.random() * 40000) + sendCloudErrorBaseDelay * 1000);

  // Receives the architecture description from the user
  socket.on("update-architecture", async (data) => {
    const response = await getRandomCloudError(data.architectureDescription);

    playerStats.users = cloudErrorUsers;
    playerStats.satisfaction -= Math.floor(Math.random() * 5) + 7;

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
    console.log(`User ${socket.id} has dismissed an iteration`);
    playerStats.satisfaction -= Math.floor(Math.random() * 5) + 1;
    playerStats.users = dismissIterationUsers;
    socket.emit("send-stats", playerStats);
  });

  // When user integrates an iteration, increase satisfaction
  socket.on("integrate-iteration", () => {
    playerStats.satisfaction += Math.floor(Math.random() * 5) + 2;
    if (playerStats.satisfaction > 100) playerStats.satisfaction = 100;
    playerStats.users = integrateIterationUsers;
    socket.emit("send-stats", playerStats);
  });

  socket.on("request-billing-cost", async (data) => {
    let response = await getMonthlyBillingCost(data, playerStats.users);
    response = response.replace(",", "").replace("$", "");
    playerStats = {
      users: playerStats.users,
      billingCost: Math.round(Number(response)) ?? playerStats.billingCost,
      satisfaction: playerStats.satisfaction,
    };
    console.log(`Received billing cost: ${response}`);
    socket.emit("send-stats", playerStats);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
  });
}
