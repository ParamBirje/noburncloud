"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAtom } from "jotai";
import React from "react";
import { iterationAtom } from "@/lib/atoms";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ArchitectureUpdateDialog from "./update-dialog";

export default function Iterations() {
  const [iteration] = useAtom(iterationAtom);

  return (
    <section id="iterations" className="flex flex-col gap-5">
      <h3 className="font-bold uppercase tracking-wide text-sm">Iterations</h3>

      <Card>
        <CardContent>
          <ScrollArea className="h-[50vh] w-full">
            <div className="py-4 flex flex-col-reverse gap-4">
              {/* Subcards */}
              {iteration.map((iter: Iteration, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      {iter.title}
                    </h4>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {iter.description}
                    </p>
                  </CardContent>
                  <CardFooter className="gap-3">
                    <ArchitectureUpdateDialog>
                      <Button variant="secondary">Integrate</Button>
                    </ArchitectureUpdateDialog>

                    <Button variant="ghost">Dismiss</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </section>
  );
}
