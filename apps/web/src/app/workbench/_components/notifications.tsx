"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAtom } from "jotai";
import { Bell, OctagonAlert } from "lucide-react";
import React from "react";
import { notificationsAtom } from "@/lib/atoms";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Markdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Notifications() {
  const [notifications] = useAtom(notificationsAtom);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed top-[12rem] right-0 py-7" variant="secondary">
          <Bell size={25} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            All the notifications related to your cloud deployment will be
            visible here.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[90%] w-full">
          <div className="flex flex-col-reverse gap-4 my-5">
            {notifications.map((notification, index) => (
              <Alert key={index}>
                <OctagonAlert color="yellow" size={15} />
                <AlertTitle className="text-yellow-300 font-medium">
                  Cloud Platform Notification
                </AlertTitle>
                <AlertDescription className="mt-2">
                  <Markdown className="text-sm text-muted-foreground">
                    {notification}
                  </Markdown>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
