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
import { notificationsAtom } from "../page";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
            All the actionable notifications related to your deployment will be
            visible here.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[90%] w-full">
          <div className="flex flex-col-reverse gap-4 my-5">
            {notifications.map((notification, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex gap-3 items-center text-yellow-200">
                    <OctagonAlert size={20} />
                    <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                      Cloud Platform Notification
                    </h4>
                  </div>
                </CardHeader>
                <CardContent>
                  <Markdown className="text-sm text-muted-foreground">
                    {notification}
                  </Markdown>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
