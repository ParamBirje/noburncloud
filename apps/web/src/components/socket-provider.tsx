"use client";

import {
  architectureAtom,
  iterationAtom,
  notificationsAtom,
  playerStatsAtom,
  playerStatsMultiplierAtom,
  requirementsAtom,
  socketAtom,
} from "@/lib/atoms";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useSocketRef from "./useSocket";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const socketRef = useSocketRef();

  const [requirements] = useAtom(requirementsAtom);
  const [architecture] = useAtom(architectureAtom);
  const [iteration, setIteration] = useAtom(iterationAtom);
  const [notifications, setNotifications] = useAtom(notificationsAtom);
  const [_socket, setSocket] = useAtom(socketAtom);
  const [playerStats, setPlayerStats] = useAtom(playerStatsAtom);
  const [playerStatsMultiplier, setPlayerStatsMultiplier] = useAtom(
    playerStatsMultiplierAtom
  );

  // Keep track of the last billing requested to allow only one request per significant change
  const [lastBillingRequested, setLastBillingRequested] = useState(0);

  useEffect(() => {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_API_URL}`);
    setSocket(socketRef.current);

    return () => {
      socketRef.current?.close();
    };
  }, []);

  // Get billing costs every significant change in playerStats.users
  useEffect(() => {
    // Finding the nearest and lowest power of 10 of the number of users
    const lowerPower = Math.pow(10, Math.floor(Math.log10(playerStats.users)));
    const lower = Math.floor(playerStats.users / lowerPower) * lowerPower;

    if (
      playerStats.users <= lower * 1.15 && // Check if it users are near by 15% of the nearest multiple of 100
      !(
        (lower <= lastBillingRequested && lastBillingRequested <= lower * 1.15) // Prevents multiple requests
      ) &&
      playerStats.users > 10
    ) {
      socketRef.current?.emit("request-billing-cost", {
        architecturePrompt: architecture.prompt,
        users: playerStats.users,
      });
      setLastBillingRequested(playerStats.users);
    }

    if (playerStats.users % 100 === 0) {
      socketRef.current?.emit("get-billing-cost", {
        architecturePrompt: architecture.prompt,
        users: playerStats.users,
      });
    }
  }, [playerStats.users]);

  // PlayerStats received from the server every minute
  useEffect(() => {
    if (architecture.components.length !== 0) {
      socketRef.current?.on("send-stats", (data: PlayerStats) => {
        setPlayerStatsMultiplier(data);
      });
    }

    return () => {
      socketRef.current?.off("send-stats");
    };
  }, [architecture.components]);

  // change playerStats according to the multiplier
  useEffect(() => {
    if (architecture.components.length === 0) return;
    setPlayerStats((prev) => ({
      users: Math.floor(prev.users * playerStatsMultiplier.users + 1),
      billingCost: playerStatsMultiplier.billingCost,
      satisfaction: playerStatsMultiplier.satisfaction,
    }));
  }, [playerStatsMultiplier]);

  // For emitting the stats to the server
  useEffect(() => {
    if (requirements !== "" && architecture.prompt !== "") {
      socketRef.current?.on("give-stats", () => {
        socketRef.current?.emit("update", {
          requirement: requirements,
          architectureDescription: architecture.prompt,
        });
      });
    } else {
      console.log("Requirements or architecture is empty");
    }

    return () => {
      socketRef.current?.off("give-stats");
    };
  }, [requirements, architecture]);

  // For receiving the new iteration
  useEffect(() => {
    socketRef.current?.on("new-iteration", (data) => {
      setIteration([...iteration, data]);
    });

    return () => {
      socketRef.current?.off("new-iteration");
    };
  });

  // For emitting the architecture description to the server
  useEffect(() => {
    if (architecture.prompt !== "") {
      socketRef.current?.on("give-architecture", () => {
        socketRef.current?.emit("update-architecture", {
          architectureDescription: architecture.prompt,
        });
      });
    } else {
      console.log("Architecture is empty");
    }

    return () => {
      socketRef.current?.off("give-architecture");
    };
  }, [architecture]);

  // For receiving the new notification
  useEffect(() => {
    socketRef.current?.on("new-notification", (data) => {
      setNotifications([...notifications, data]);
    });

    return () => {
      socketRef.current?.off("new-notification");
    };
  });

  return <>{children}</>;
}
