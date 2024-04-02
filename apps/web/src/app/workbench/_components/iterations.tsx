import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function Iterations() {
  return (
    <section id="iterations" className="flex flex-col gap-5">
      <h3 className="font-bold uppercase tracking-wide text-sm">Iterations</h3>

      <Card>
        <CardContent className="py-4">
          <p className=" text-muted-foreground text-sm">All mails caught up!</p>
        </CardContent>
      </Card>
    </section>
  );
}
