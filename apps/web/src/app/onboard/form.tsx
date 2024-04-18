"use client";

import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { requirementsAtom } from "@/lib/atoms";
import { log } from "@repo/logger";

export default function CustomRequirementForm() {
  const [_requirements, setRequirements] = useAtom(requirementsAtom);
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setRequirements(event.currentTarget.message.value);
    router.push("/workbench");
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="grid w-full gap-3">
        <Textarea
          id="message"
          placeholder="Type your idea / requirement here."
        />
        <p className="text-sm text-muted-foreground">
          This will be used to provide a tailored experience in the simulation.
        </p>
      </div>

      <Button className="w-fit" type="submit">
        Continue
      </Button>
    </form>
  );
}
