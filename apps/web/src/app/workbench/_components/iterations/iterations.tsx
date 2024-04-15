"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import { iterationAtom } from "@/lib/atoms";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ArchitectureUpdateDialog from "./update-dialog";
import { useAtom } from "jotai";
import IterationDeleteDialog from "./delete-dialog";

export default function Iterations() {
  const [iterations] = useAtom(iterationAtom);

  return (
    <section id="iterations" className="flex flex-col gap-5">
      <h3 className="font-bold uppercase tracking-wide text-sm">Iterations</h3>

      <Card>
        <CardContent>
          <ScrollArea className="h-[50vh] w-full">
            <div className="py-4 flex flex-col-reverse gap-4">
              {/* Subcards */}
              {iterations.map((iter: Iteration, index: number) => (
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
                    <ArchitectureUpdateDialog iteration={iter}>
                      <Button variant="secondary">Integrate</Button>
                    </ArchitectureUpdateDialog>

                    <IterationDeleteDialog index={index}>
                      <Button variant="ghost">Dismiss</Button>
                    </IterationDeleteDialog>
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
