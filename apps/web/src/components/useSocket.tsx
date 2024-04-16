import { useRef } from "react";
import { Socket } from "socket.io-client";

export default function useSocketRef() {
  const socketRef = useRef<Socket | null>(null);

  return socketRef;
}
