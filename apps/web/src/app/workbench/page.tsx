import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import Stats from "./_components/stats";
import Requirements from "./_components/requirements";
import { atom } from "jotai";
import Architecture from "./_components/architecture/architecture";
import Iterations from "./_components/iterations";
import Notifications from "./_components/notifications";

// states
export const requirementsAtom = atom("");
export const architectureAtom = atom({
  prompt: "",
  components: [],
});

export default function Page() {
  return (
    <main className="my-10 w-3/4 mx-auto flex flex-col gap-16 relative">
      <div className="flex justify-between items-center">
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

      <section id="deployment" className="flex flex-col gap-5">
        <h3 className="font-bold uppercase tracking-wide text-sm">
          Deployment
        </h3>

        <div className="flex justify-between gap-5">
          <Card className="w-full">
            <CardContent className="py-4">
              <p className=" text-muted-foreground text-xl font-light">
                Status <span className="text-accent">Healthy</span>
              </p>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Support</CardTitle>
              <p className="text-sm text-muted-foreground">
                Chat with the cloud support team here
              </p>
            </CardHeader>
            <CardContent className="py-4">
              <p className=" text-muted-foreground">some chats here</p>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-between items-center space-x-2">
                <Input type="email" placeholder="Type your message here" />
                <Button type="submit">Send</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>

      <Iterations />

      {/* Docked to the right */}
      <Notifications />
    </main>
  );
}
