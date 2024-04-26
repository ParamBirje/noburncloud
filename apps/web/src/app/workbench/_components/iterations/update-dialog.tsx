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
import { architectureAtom, iterationAtom, socketAtom } from "@/lib/atoms";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Ban, ClipboardCheck, Lightbulb } from "lucide-react";

export default function ArchitectureUpdateDialog({
  children,
  iteration,
}: {
  iteration: Iteration;
  children: React.ReactNode;
}) {
  const [architecture, setArchitecture] = useAtom(architectureAtom);
  const [iterations, setIterations] = useAtom(iterationAtom);
  const [socket] = useAtom(socketAtom);
  const [updatedArchitecture, setUpdatedArchitecture] = useState<string>("");
  const [prompt, setPrompt] = useState<string>();
  const [showAlert, setShowAlert] = useState({ failed: -1, message: "" });
  const [loading, setLoading] = useState(false);

  function integrateIteration(): void {
    if (showAlert.failed === 0) {
      setArchitecture({ ...architecture, prompt: updatedArchitecture });
      setIterations(iterations.filter((iter: Iteration) => iter !== iteration));
      if (socket) {
        socket.emit("integrate-iteration");
      } else {
        console.log("Socket is not connected");
      }

      // Reset showAlert
      setShowAlert({ failed: -1, message: "" });
    }
  }

  useEffect(() => {
    void (async () => {
      if (updatedArchitecture !== "" && updatedArchitecture.length < 1000) {
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/architecture/check`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              desc: updatedArchitecture,
              iteration: `${iteration.title} | ${iteration.description}`,
            }),
          }
        );

        const data = await response.json();

        if (data.message === "yes") {
          setShowAlert({
            failed: 0,
            message:
              "The product enhancement can be successfully applied by using this updated config!",
          });
        } else {
          setShowAlert({
            failed: 1,
            message:
              "The product enhancement cannot be applied using this config. Please try again.",
          });
        }

        setLoading(false);
      }
    })();
  }, [updatedArchitecture]);

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
                maxLength={1000}
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                placeholder="Enter your architecture details here."
                spellCheck={false}
              />
              <p className="text-sm text-muted-foreground">
                eg. Google Pub/Sub to integrate notifications
              </p>
            </div>
          </div>
        </DialogHeader>

        {showAlert.message !== "" && (
          <Alert variant={showAlert.failed === 1 ? "destructive" : "default"}>
            {showAlert.failed === 1 ? (
              <Ban color="red" size={15} />
            ) : (
              <ClipboardCheck color="green" size={15} />
            )}
            <AlertTitle
              className={`font-medium ${
                showAlert.failed === 1 ? "text-red-400" : "text-green-400"
              }`}
            >
              {showAlert.failed === 1
                ? "Cannot Integrate"
                : "Ready to Integrate"}
            </AlertTitle>
            <AlertDescription className="mt-2 text-sm text-muted-foreground">
              {showAlert.message}
            </AlertDescription>
          </Alert>
        )}

        {showAlert.failed === 1 && (
          <Alert>
            <Lightbulb color="yellow" size={15} />
            <AlertTitle className="font-medium text-yellow-300">
              Hint
            </AlertTitle>
            <AlertDescription className="mt-2 text-sm text-muted-foreground">
              Chat with the cloud platform support for help on how you could
              integrate the feature.
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter className="items-center gap-4">
          {prompt === undefined && (
            <p className="text-sm text-muted-foreground">
              No change in the config detected.
            </p>
          )}

          {showAlert.failed !== 0 && (
            <Button
              disabled={loading || prompt === undefined}
              onClick={() => {
                if (prompt) {
                  setUpdatedArchitecture(prompt);
                }
              }}
              variant="outline"
            >
              {loading ? "Checking..." : "Check"}
            </Button>
          )}

          {showAlert.failed === 0 && showAlert.message !== "" && (
            <DialogClose asChild>
              <Button onClick={integrateIteration}>Integrate</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
