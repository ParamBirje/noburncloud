import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Stats from "./_components/stats";
import Requirements from "./_components/requirements";
import Architecture from "./_components/architecture/architecture";
import Iterations from "./_components/iterations/iterations";
import Notifications from "./_components/notifications";
import ChatSupport from "./_components/hosting-support/support";
import SocketProvider from "@/components/socket-provider";
import Sonner from "./_components/sonner";

export default function Page() {
  return (
    <SocketProvider>
      <main className="my-10 w-3/4 mx-auto flex flex-col gap-16 relative">
        <div className="flex justify-between items-center">
          {/* Socket handler here */}
          <Stats />

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

        <Requirements />

        <Architecture />

        <ChatSupport />

        <Iterations />

        {/* Docked to the right */}
        <Notifications />

        <Sonner />
      </main>
    </SocketProvider>
  );
}
