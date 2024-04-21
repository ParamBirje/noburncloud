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
import { chatHistoryAtom } from "@/lib/atoms";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function Chat() {
  const [chatHistory, setChatHistory] = useAtom(chatHistoryAtom);
  const [latestMsg, setLatestMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleChatMessageSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setLoading(true);
    if (latestMsg && latestMsg.length < 300) {
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
          {chatHistory.length === 0 && (
            <p className="text-sm text-muted-foreground">
              &gt; Support team is <b>online.</b>
            </p>
          )}

          {chatHistory.map((chat, index) => (
            <div key={index} className="flex flex-col gap-2 mb-5">
              <p
                className={`text-xs capitalize ${
                  chat.role === "user"
                    ? "text-accent font-bold"
                    : "text-muted-foreground"
                }`}
              >
                {chat.role === "user" ? "you" : "support"}
              </p>
              <p className="text-sm">{chat.parts[0].text}</p>
            </div>
          ))}

          {loading && <p className="text-sm text-accent">Typing...</p>}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={handleChatMessageSubmit}
          className="flex w-full justify-between items-center space-x-2"
        >
          <Input
            disabled={loading}
            value={latestMsg}
            maxLength={300}
            type="text"
            onChange={(e) => {
              setLatestMsg(e.target.value);
            }}
            placeholder="Type your message here"
          />
          <Button disabled={loading} type="submit">
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
