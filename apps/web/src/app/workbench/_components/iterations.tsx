import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function Iterations() {
  return (
    <section id="iterations" className="flex flex-col gap-5">
      <h3 className="font-bold uppercase tracking-wide text-sm">Iterations</h3>

      <Card>
        <CardContent className="py-4 flex flex-col gap-4">
          {/* Subcards */}
          <Card>
            <CardHeader>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Need a database replica to perform analytics
              </h4>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut
                facilis ad impedit earum incidunt asperiores.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                File storage is needed for user avatars
              </h4>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut
                facilis ad impedit earum incidunt asperiores.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </section>
  );
}
