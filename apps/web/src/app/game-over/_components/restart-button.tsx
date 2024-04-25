"use client";

import { Button } from "@/components/ui/button";

export default function RestartButton() {
  function handleClick() {
    window.location.href = "/onboard";
  }

  return <Button onClick={handleClick}>Start Again</Button>;
}
