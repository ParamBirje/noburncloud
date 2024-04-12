"use client";
import { io, type Socket } from "socket.io-client";
import { CircleDollarSign, Heart, Laugh } from "lucide-react";
import { useEffect, useRef } from "react";
import { log } from "@repo/logger";
import {
  architectureAtom,
  iterationAtom,
  notificationsAtom,
  requirementsAtom,
} from "../page";
import { useAtom } from "jotai";

export default function Stats() {
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
      log(`New notification: ${data}`);
    });

    return () => {
      socketRef.current?.off("new-notification");
    };
  });

  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-bold uppercase tracking-wide text-accent text-sm">
        Stats
      </h3>

      <div className="flex items-center gap-5">
        <CircleDollarSign size={30} />
        <p className="text-2xl font-bold">
          7,034{" "}
          <span className="font-normal text-sm text-muted-foreground">
            in bills
          </span>
        </p>
      </div>

      <div className="flex gap-8 items-center">
        <div className="flex items-center gap-5">
          <Laugh size={30} />
          <p className="text-2xl font-bold">
            302{" "}
            <span className="font-normal text-sm text-muted-foreground">
              users
            </span>
          </p>
        </div>
        <div className="flex items-center gap-5">
          <Heart size={30} />
          <p className="text-2xl font-bold">
            60{" "}
            <span className="font-normal text-sm text-muted-foreground">
              % satisfaction
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
