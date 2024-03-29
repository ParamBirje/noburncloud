import React from "react";

export default function Requirements() {
  return (
    <section id="requirements" className="flex flex-col gap-5">
      <h3 className="font-bold uppercase tracking-wide text-sm">
        Requirements
      </h3>

      <p className=" text-muted-foreground tracking-wide">
        A company wants to organize the contents of multiple websites in managed
        file storage. The company must be able to scale the storage based on
        demand without needing to provision storage. Multiple servers should be
        able to access this storage concurrently.
      </p>
    </section>
  );
}
