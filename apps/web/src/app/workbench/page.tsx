import { Button } from "@/components/ui/button";
import { CircleDollarSign, Heart, Info, Laugh } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <main className="my-10 w-3/4 mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-5">
          <h3 className="font-bold uppercase tracking-wide text-accent text-sm">
            Stats
          </h3>

          <div className="flex items-center gap-5">
            <CircleDollarSign size={30} />
            <p className="text-2xl font-bold">
              7,034{" "}
              <span className="font-normal text-sm text-muted-foreground">
                in bills
              </span>
            </p>
          </div>

          <div className="flex gap-8 items-center">
            <div className="flex items-center gap-5">
              <Laugh size={30} />
              <p className="text-2xl font-bold">
                302{" "}
                <span className="font-normal text-sm text-muted-foreground">
                  users
                </span>
              </p>
            </div>
            <div className="flex items-center gap-5">
              <Heart size={30} />
              <p className="text-2xl font-bold">
                60{" "}
                <span className="font-normal text-sm text-muted-foreground">
                  % satisfaction
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-5">
          <div className="text-right">
            <h1 className="scroll-m-20 text-3xl font-light tracking-tight lg:text-4xl">
              The Workbench<span className="text-accent">.</span>
            </h1>

            <p className="text-muted-foreground tracking-wide">
              All the tools you need, in one place.
            </p>
          </div>

          <Button className="flex items-center gap-2" variant="secondary">
            <Info size={20} />
            <p>Help</p>
          </Button>
        </div>
      </div>
    </main>
  );
}