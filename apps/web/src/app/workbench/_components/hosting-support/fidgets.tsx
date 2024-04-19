"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { architectureAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Fidgets() {
  const [architecture] = useAtom(architectureAtom);
  const [progress, setProgress] = useState({
    users: 40,
  });

  useEffect(() => {
    const intervalUsers = setInterval(
      () => {
        setProgress({
          ...progress,
          users: Math.floor(Math.random() * 100) + 40,
        });
      },
      Math.floor(Math.random() * 7000) + 4000
    );

    return () => {
      clearInterval(intervalUsers);
    };
  }, []);

  return (
    architecture.components.length > 0 && (
      <>
        <p className=" text-muted-foreground text-xl font-light">
          Status <span className="text-accent">Active</span>
        </p>

        <Card className="flex items-center justify-between px-4 py-3">
          <p className="text-muted-foreground text-lg font-light">
            Current Users
          </p>
          <Progress className="w-[60%] h-3" value={progress.users} />
        </Card>

        <p className=" text-muted-foreground text-xl font-light mt-5">
          Services <span className="text-yellow-400">Usage</span>
        </p>

        {architecture.components
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((component: any) => (
            <Card
              className="flex items-center justify-between gap-5 px-4 py-3"
              key={component.name}
            >
              <p className="text-muted-foreground font-light">
                {component.name}
              </p>
              <Progress
                className="w-1/3 h-3"
                value={Math.floor(Math.random() * 100) + 20}
              />
            </Card>
          ))}
      </>
    )
  );
}
