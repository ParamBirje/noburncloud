"use client";

import {
  notificationsAtom,
  iterationAtom,
  architectureAtom,
  playerStatsAtom,
} from "@/lib/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Sonner() {
  const [notifications] = useAtom(notificationsAtom);
  const [iterations] = useAtom(iterationAtom);
  const [architecture] = useAtom(architectureAtom);
  const [playerStats] = useAtom(playerStatsAtom);
  const router = useRouter();

  useEffect(() => {
    if (playerStats.satisfaction < 10) {
      router.push("/game-over");
    } else if (playerStats.satisfaction < 30) {
      toast.error(`CRITICAL: User base is falling hard`, {
        description: `Save your user base by improving your product with enhancements.`,
      });
    } else if (playerStats.satisfaction < 50) {
      toast.error(`Users are leaving your product :(`, {
        description: `Attract more users by improving your product with enhancements and making it resilient to cloud failures.`,
      });
    }
  }, [playerStats.satisfaction]);

  useEffect(() => {
    if (iterations.length > 0) {
      toast.info(`Product Enhancement List Updated`, {
        action: {
          label: "See",
          onClick: () => {
            const element = document.getElementById("iterations");
            element?.scrollIntoView({ behavior: "smooth" });
          },
        },
      });
    }
  }, [iterations]);

  useEffect(() => {
    if (notifications.length > 0) {
      toast.warning(`Notification from Cloud Platform`);
    }
  }, [notifications]);

  useEffect(() => {
    if (architecture.prompt !== "") {
      toast.success(`Cloud Architecture Updated`);
    }
  }, [architecture.prompt]);

  return <Toaster duration={3000} />;
}
