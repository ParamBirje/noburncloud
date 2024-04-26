"use client";

import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { requirementsAtom } from "@/lib/atoms";
import useCustomFormik from "@/lib/formik";

export default function CustomRequirementForm() {
  const [_requirements, setRequirements] = useAtom(requirementsAtom);
  const router = useRouter();
  const formik = useCustomFormik({ maxLength: 800, onSubmit: handleSubmit });

  function handleSubmit(values: any): void {
    setRequirements(values.desc);
    router.push("/workbench");
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={formik.handleSubmit}>
      <div className="grid w-full gap-3">
        <Textarea
          id="message"
          maxLength={800}
          placeholder="Type your idea / requirement here."
          {...formik.getFieldProps("desc")}
        />
        <p className="text-sm text-muted-foreground">
          This will be used to provide a tailored experience in the simulation.
        </p>
      </div>

      <Button className="w-fit" type="submit">
        Let&apos;s Roll!
      </Button>
    </form>
  );
}
