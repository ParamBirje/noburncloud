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
import { Bell } from "lucide-react";
import React from "react";

export default function Notifications() {
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
      </SheetContent>
    </Sheet>
  );
}
