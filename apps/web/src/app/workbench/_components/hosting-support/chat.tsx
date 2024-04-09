"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { chatHistoryAtom } from "../../page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function Chat() {
  const [chatHistory, setChatHistory] = useAtom(chatHistoryAtom);
  const [latestMsg, setLatestMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleChatMessageSubmit(): Promise<void> {
    setLoading(true);
    if (latestMsg) {
      const res = await fetch("http://localhost:5001/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latestMsg, history: chatHistory }),
      });

      const data = await res.json();

      setChatHistory([
        ...chatHistory,
        {
          role: "user",
          parts: [{ text: latestMsg }],
        },
        {
          role: "model",
          parts: [{ text: data.text }],
        },
      ]);
      setLatestMsg("");
    }
    setLoading(false);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Support</CardTitle>
        <p className="text-sm text-muted-foreground">
          Chat with the cloud support team here
        </p>
      </CardHeader>
      <CardContent className="pb-4">
        <ScrollArea className="h-[300px] rounded-md border p-4">
          {chatHistory.map((chat, index) => (
            <div key={index} className="flex flex-col gap-2 mb-5">
              <p className="text-xs text-muted-foreground capitalize">
                {chat.role === "user" ? "you" : "support"}
              </p>
              <p className="text-sm">{chat.parts[0].text}</p>
            </div>
          ))}
          {loading && <p className="text-sm text-accent">Typing...</p>}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between items-center space-x-2">
          <Input
            disabled={loading}
            value={latestMsg}
            type="email"
            onChange={(e) => {
              setLatestMsg(e.target.value);
            }}
            placeholder="Type your message here"
          />
          <Button
            disabled={loading}
            onClick={handleChatMessageSubmit}
            type="submit"
          >
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
