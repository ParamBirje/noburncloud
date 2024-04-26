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
import { architectureAtom, socketAtom } from "@/lib/atoms";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useCustomFormik from "@/lib/formik";
import { Pencil, Plus, Send } from "lucide-react";

export default function DialogForm({
  getComponents,
  isLoading,
}: {
  getComponents: () => Promise<void>;
  isLoading: boolean;
}) {
  const [architecture, setArchitecture] = useAtom(architectureAtom);
  const [socket] = useAtom(socketAtom);

  const formik = useCustomFormik({
    maxLength: 1000,
    onSubmit: handleSubmit,
    defaultDesc: architecture.prompt,
  });

  function handleSubmit(values: any): void {
    if (values.desc !== "") {
      setArchitecture({ ...architecture, prompt: values.desc });
    }
  }

  useEffect(() => {
    void (async () => {
      if (architecture.prompt !== "") {
        await getComponents();
        if (socket) socket.emit("request-billing-cost", architecture.prompt);
      }
    })();
  }, [architecture.prompt]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2" disabled={isLoading}>
          {architecture.components.length > 0 ? (
            <Pencil size={15} />
          ) : (
            <Plus size={18} />
          )}
          {architecture.components.length > 0
            ? "Edit Config"
            : "Add Components"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>Describe your architecture in detail.</DialogTitle>
            <DialogDescription className="tracking-wide">
              This prompt will be used to identify individual services used. For
              accurate estimation of billing costs give as much details as
              possible. Mix and match services from different cloud providers!
            </DialogDescription>

            <div className="flex flex-col gap-5 py-3">
              <div className="grid w-full gap-3">
                <Textarea
                  maxLength={1000}
                  id="message"
                  placeholder="Enter your architecture details here."
                  {...formik.getFieldProps("desc")}
                />
                <p className="text-sm text-muted-foreground">
                  eg. 3 t2.micro AWS EC2 instances for backend tasks, Google
                  Firebase to store user data, etc.
                </p>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="gap-2" type="submit">
                <Send size={18} />
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
