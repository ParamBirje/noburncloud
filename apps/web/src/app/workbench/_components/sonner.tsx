"use client";

import {
  notificationsAtom,
  iterationAtom,
  architectureAtom,
} from "@/lib/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";

export default function Sonner() {
  const [notifications] = useAtom(notificationsAtom);
  const [iterations] = useAtom(iterationAtom);
  const [architecture] = useAtom(architectureAtom);

  useEffect(() => {
    if (iterations.length > 0) {
      toast.info(`New Product Enhancement Received`, {
        action: {
          label: "See",
          onClick: () => console.log("Undo"),
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
