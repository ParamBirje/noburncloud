import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="min-h-screen w-3/4 mx-auto flex justify-center items-center">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="scroll-m-20 text-3xl font-light tracking-tight lg:text-4xl">
            What&apos;s your idea / requirements{" "}
            <span className="text-accent">?</span>
          </h1>
        </div>

        <p className="text-muted-foreground tracking-wide w-3/4">
          Provide a description of your product idea elaborating the features,
          problems it addresses, etc.
        </p>

        <Link href="/workbench">
          <Button variant="secondary">
            I don&apos;t have one, generate a requirement for me
          </Button>
        </Link>

        <div className="flex items-center gap-5">
          <p className="text-muted-foreground text-sm">OR</p>
          <Separator />
        </div>

        <div className="grid w-full gap-3">
          <Textarea
            id="message"
            placeholder="Type your idea / requirement here."
          />
          <p className="text-sm text-muted-foreground">
            This will be used to provide a tailored experience in the
            simulation.
          </p>
        </div>

        <Link href="/workbench">
          <Button>Continue</Button>
        </Link>
      </div>
    </main>
  );
}
