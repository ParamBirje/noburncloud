"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAtom } from "jotai";
import { architectureAtom } from "@/lib/atoms";

export default function ArchitectureUpdateDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [architecture, setArchitecture] = useAtom(architectureAtom);
  const [prompt, setPrompt] = useState<string>();

  useEffect(() => {
    void (async () => {
      if (architecture.prompt !== "") {
        // Call the server to update the architecture and delete the iteration card
      }
    })();
  }, [architecture.prompt]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Extend your architecture</DialogTitle>
          <DialogDescription className="tracking-wide">
            Add the feature to your architecture to integrate it with the
            current config you have. If the feature does not require a new
            service, simply specify how it can be integrated into an existing
            service.
          </DialogDescription>

          <div className="flex flex-col gap-5 py-3">
            <div className="grid w-full gap-3">
              <Textarea
                defaultValue={architecture.prompt}
                id="message"
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                spellCheck={false}
                placeholder="Enter your architecture details here."
              />
              <p className="text-sm text-muted-foreground">
                eg. This is an example
              </p>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                if (prompt) {
                  setArchitecture({ ...architecture, prompt });
                }
              }}
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
