"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAtom } from "jotai";
import React from "react";
import { iterationAtom } from "../page";

export default function Iterations() {
  // iterationAtom
  const [iteration] = useAtom(iterationAtom);

  return (
    <section id="iterations" className="flex flex-col gap-5">
      <h3 className="font-bold uppercase tracking-wide text-sm">Iterations</h3>

      <Card>
        <CardContent className="py-4 flex flex-col gap-4">
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
            </Card>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
