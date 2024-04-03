"use client";

import {
  Dialog,
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

export default function DialogForm() {
  const [architecture, setArchitecture] = useAtom(architectureAtom);
  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        {/* Button component doesn't work inside */}
        Add Components
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
                id="message"
                defaultValue={architecture.prompt}
                placeholder="Enter your architecture details here."
              />
              <p className="text-sm text-muted-foreground">
                eg. This is an example
              </p>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              setArchitecture({ ...architecture, prompt: "" });
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
