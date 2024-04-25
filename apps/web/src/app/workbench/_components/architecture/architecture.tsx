"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import DialogForm from "./form";
import { useAtom } from "jotai";
import { architectureAtom, requirementsAtom } from "@/lib/atoms";
import { ReactElement, useState } from "react";
import { ArchitectureComponent } from "./component";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";
import Markdown from "react-markdown";

export default function Architecture(): ReactElement {
  const [architecture, setArchitecture] = useAtom(architectureAtom);
  const [requirements] = useAtom(requirementsAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string>();

  async function getComponents(): Promise<void> {
    if (architecture.prompt !== "") {
      setIsLoading(true);
      setSuggestions(undefined);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/architecture`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            desc: architecture.prompt,
          }),
        }
      );

      const jsonData = await response.json();
      setArchitecture({ ...architecture, components: jsonData.components });

      setIsLoading(false);

      if (jsonData.components.length !== 0) {
        // Get suggestions for the architecture
        const suggestionsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/architecture/suggest`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              archDesc: architecture.prompt,
              requirements: requirements,
              users: 100,
            }),
          }
        );

        const suggestionsData = await suggestionsResponse.json();
        setSuggestions(suggestionsData.suggestions);
      }
    }
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

      {suggestions && (
        <Alert className="border-yellow-300 border-opacity-20">
          <Lightbulb color="yellow" size={15} />
          <AlertTitle className="text-yellow-300 font-medium">
            Suggestions
          </AlertTitle>
          <AlertDescription className="mt-2">
            <Markdown className="text-sm text-muted-foreground tracking-wide">
              {suggestions}
            </Markdown>
          </AlertDescription>
        </Alert>
      )}
    </section>
  );
}
