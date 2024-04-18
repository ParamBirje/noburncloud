"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import DialogForm from "./form";
import { useAtom } from "jotai";
import { architectureAtom } from "@/lib/atoms";
import { ReactElement, useState } from "react";
import { ArchitectureComponent } from "./component";

export default function Architecture(): ReactElement {
  const [architecture, setArchitecture] = useAtom(architectureAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getComponents(): Promise<void> {
    setIsLoading(true);
    if (architecture.prompt !== "") {
      const response = await fetch("http://localhost:5001/architecture", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          desc: architecture.prompt,
        }),
      });

      const jsonData = await response.json();
      setArchitecture({ ...architecture, components: jsonData.components });
    }
    setIsLoading(false);
  }

  return (
    <section className="flex flex-col gap-5" id="architecture">
      <h3 className="font-bold uppercase tracking-wide text-sm">
        Architecture
      </h3>

      <Card>
        <CardContent className="py-4">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Loading</p>
          ) : architecture.components.length !== 0 ? (
            <div className="flex flex-wrap gap-4">
              {architecture.components.map((component: any, idx) => {
                return (
                  <ArchitectureComponent key={idx} component={component} />
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Add cloud services as components here!
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <DialogForm getComponents={getComponents} isLoading={isLoading} />
        </CardFooter>
      </Card>
    </section>
  );
}
