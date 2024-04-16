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
import { log } from "@repo/logger";
import { useAtom } from "jotai";
import { useEffect } from "react";
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
  const [_playerStats, setPlayerStats] = useAtom(playerStatsAtom);
  const [playerStatsMultiplier, setPlayerStatsMultiplier] = useAtom(
    playerStatsMultiplierAtom
  );

  useEffect(() => {
    socketRef.current = io("http://localhost:5001");
    setSocket(socketRef.current);

    return () => {
      socketRef.current?.close();
    };
  }, []);

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
      log("Requirements or architecture is empty");
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
      log("Architecture is empty");
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
