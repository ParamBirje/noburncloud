"use client";
import { playerStatsAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { CircleDollarSign, Heart, Laugh } from "lucide-react";

export default function Stats() {
  const [playerStats] = useAtom(playerStatsAtom);

  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-bold uppercase tracking-wide text-accent text-sm">
        Stats
      </h3>

      <div className="flex items-center gap-5">
        <CircleDollarSign size={30} />
        <p className="text-2xl font-bold">
          {/* Multiplying by 30% to get a more accurate range */}
          {`${playerStats.billingCost ? Math.round(playerStats.billingCost * 0.3) : "--"} `}
          <span className="font-normal text-sm text-muted-foreground">
            in monthly bills
          </span>
        </p>
      </div>

      <div className="flex gap-8 items-center">
        <div className="flex items-center gap-5">
          <Laugh size={30} />
          <p className="text-2xl font-bold">
            {`${playerStats.users} `}
            <span className="font-normal text-sm text-muted-foreground">
              users
            </span>
          </p>
        </div>
        <div className="flex items-center gap-5">
          <Heart size={30} />
          <p className="text-2xl font-bold">
            {`${playerStats.satisfaction} `}
            <span className="font-normal text-sm text-muted-foreground">
              % satisfaction
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
