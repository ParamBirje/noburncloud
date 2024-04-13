"use client";

import {
  architectureAtom,
  iterationAtom,
  notificationsAtom,
  requirementsAtom,
} from "@/lib/atoms";
import { log } from "@repo/logger";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [requirements] = useAtom(requirementsAtom);
  const [architecture] = useAtom(architectureAtom);
  const [iteration, setIteration] = useAtom(iterationAtom);
  const [notifications, setNotifications] = useAtom(notificationsAtom);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:5001");

    return () => {
      socketRef.current?.close();
    };
  }, []);

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
