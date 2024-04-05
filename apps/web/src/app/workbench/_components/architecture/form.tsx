"use client";

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
import { architectureAtom } from "../../page";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { log } from "@repo/logger";

export default function DialogForm({
  getComponents,
}: {
  getComponents: () => Promise<void>;
}) {
  const [architecture, setArchitecture] = useAtom(architectureAtom);
  const [prompt, setPrompt] = useState<string>();

  useEffect(() => {
    void (async () => {
      if (architecture.prompt !== "") {
        await getComponents();
      }
    })();
  }, [architecture.prompt]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          {architecture.components.length > 0
            ? "Edit Config"
            : "Add Components"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Describe your architecture in detail.</DialogTitle>
          <DialogDescription className="tracking-wide">
            This prompt will be used and processed to identify individual
            services used. The sorting and identification process is done
            automatically so give as much details as possible.
          </DialogDescription>

          <div className="flex flex-col gap-5 py-3">
            <div className="grid w-full gap-3">
              <Textarea
                defaultValue={architecture.prompt}
                id="message"
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
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
