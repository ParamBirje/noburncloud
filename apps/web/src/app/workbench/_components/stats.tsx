"use client";
import { CircleDollarSign, Heart, Laugh } from "lucide-react";

export default function Stats() {
  return (
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
  );
}
