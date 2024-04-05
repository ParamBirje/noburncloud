"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import DialogForm from "./form";
import { useAtom } from "jotai";
import { architectureAtom } from "../../page";
import { log } from "@repo/logger";
import { useState } from "react";

export default function Architecture() {
  const [architecture, setArchitecture] = useAtom(architectureAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getComponents(): Promise<void> {
    setIsLoading(true);
    if (architecture.prompt !== "") {
      const response = await fetch("http://localhost:5001/architecture", {
        method: "PUT",
        body: JSON.stringify({
          desc: architecture.prompt,
        }),
      });

      const jsonData = await response.json();
      setArchitecture({ ...architecture, components: jsonData.components });
      log(`components ${architecture.components}`);
    }
    setIsLoading(false);
  }

  return (
    <section id="architecture" className="flex flex-col gap-5">
      <h3 className="font-bold uppercase tracking-wide text-sm">
        Architecture
      </h3>

      <Card>
        <CardContent className="py-4">
          {isLoading ? (
            <p>Loading</p>
          ) : architecture.components.length !== 0 ? (
            <p>
              {architecture.components.map((component: any) => {
                return <div>{component.name}</div>;
              })}
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">
              Describe your architecture here!
            </p>
          )}
          {/* {architecture.components && architecture.components.length > 0 ? (
            architecture.components.map((component: any, idx) => {
              return <div key={idx}>{component.name}</div>;
            })
          ) : (
            <p className=" text-muted-foreground text-sm">
              Add cloud services as components here!
            </p>
          )} */}
        </CardContent>
        <CardFooter className="flex justify-end">
          <DialogForm getComponents={getComponents} />
        </CardFooter>
      </Card>
    </section>
  );
}
