"use client";
import { playerStatsAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { CircleDollarSign, Heart, Laugh } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Stats() {
  const [playerStats] = useAtom(playerStatsAtom);

  const tooltipDuration = 200;

  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-bold uppercase tracking-wide text-accent text-sm">
        Stats
      </h3>

      {/* Monthly Billing Costs */}
      <TooltipProvider>
        <Tooltip delayDuration={tooltipDuration}>
          <TooltipTrigger className="w-fit">
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
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Estimated figure{" "}
              <span className="italic">(may be inaccurate)</span>
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex gap-8 items-center">
        {/* Users */}
        <div className="flex items-center gap-5">
          <Laugh size={30} />
          <p className="text-2xl font-bold">
            {`${playerStats.users} `}
            <span className="font-normal text-sm text-muted-foreground">
              users
            </span>
          </p>
        </div>

        {/* Satisfaction */}
        <TooltipProvider>
          <Tooltip delayDuration={tooltipDuration}>
            <TooltipTrigger className="w-fit">
              <div
                className={`flex items-center gap-5 ${playerStats.satisfaction < 30 && "animate-pulse"}`}
              >
                <Heart
                  className={`${playerStats.satisfaction < 30 && "text-red-400"}`}
                  size={30}
                />
                <p className="text-2xl font-bold">
                  {`${playerStats.satisfaction} `}
                  <span className="font-normal text-sm text-muted-foreground">
                    % satisfaction
                  </span>
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                User Base Satisfaction{" "}
                <span className="italic">(always keep a healthy rate)</span>
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
