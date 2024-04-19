"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { architectureAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

export default function GameStats() {
  const [architecture] = useAtom(architectureAtom);
  return (
    <Card className="mt-10 w-full">
      <CardHeader>
        <CardTitle>Your Architecture Prompt</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground tracking-wide">
        {architecture.prompt || "Error retrieving prompt."}
      </CardContent>
    </Card>
  );
}
