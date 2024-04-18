"use client";

import { log } from "@repo/logger";
import { useAtom } from "jotai";
import { requirementsAtom } from "@/lib/atoms";
import { useEffect } from "react";
import Markdown from "react-markdown";

export default function Requirements() {
  const [requirements, setRequirements] = useAtom(requirementsAtom);

  useEffect(() => {
    fetch(`http://localhost:5001/requirements`, {
      method: "GET",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setRequirements(data.text);
      })
      .catch((e) => log(e));
  }, []);

  return (
    <section id="requirements" className="flex flex-col gap-5">
      <h3 className="font-bold uppercase tracking-wide text-sm">
        Requirements
      </h3>

      {requirements === "" ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : (
        <Markdown className="text-sm text-muted-foreground tracking-wide">
          {requirements}
        </Markdown>
      )}
    </section>
  );
}
