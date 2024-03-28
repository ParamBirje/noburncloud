import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bell, CircleDollarSign, Heart, Info, Laugh } from "lucide-react";

const socket = io("http://localhost:5001");

export default function Page() {
  return (
    <main className="my-10 w-3/4 mx-auto flex flex-col gap-16 relative">
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

      <section id="requirements" className="flex flex-col gap-5">
        <h3 className="font-bold uppercase tracking-wide text-sm">
          Requirements
        </h3>

        <p className=" text-muted-foreground tracking-wide">
          A company wants to organize the contents of multiple websites in
          managed file storage. The company must be able to scale the storage
          based on demand without needing to provision storage. Multiple servers
          should be able to access this storage concurrently.
        </p>
      </section>

      <section id="architecture" className="flex flex-col gap-5">
        <h3 className="font-bold uppercase tracking-wide text-sm">
          Architecture
        </h3>

        <Card>
          <CardContent className="py-4">
            <p className=" text-muted-foreground text-sm">
              Add cloud services as components here!
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Add Component</Button>
          </CardFooter>
        </Card>
      </section>

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

      <section id="client" className="flex flex-col gap-5">
        <h3 className="font-bold uppercase tracking-wide text-sm">
          Client Comms.
        </h3>

        <Card>
          <CardContent className="py-4">
            <p className=" text-muted-foreground text-sm">
              All mails caught up!
            </p>
          </CardContent>
        </Card>
      </section>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              className="fixed top-[12rem] right-0 py-7"
            >
              <Bell size={25} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </main>
  );
}
