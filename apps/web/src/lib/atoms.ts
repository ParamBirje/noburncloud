import { atom } from "jotai";
import { Socket } from "socket.io-client";

export const requirementsAtom = atom("");
export const architectureAtom = atom({
  prompt: "",
  components: [],
});
export const chatHistoryAtom = atom<ChatHistoryContent[]>([]);
export const iterationAtom = atom<Iteration[]>([]);
export const notificationsAtom = atom<string[]>([]);

export const playerStatsAtom = atom<PlayerStats>({
  users: 0,
  billingCost: 0,
  satisfaction: 100,
});

export const playerStatsMultiplierAtom = atom<PlayerStats>({
  users: 0,
  billingCost: 0,
  satisfaction: 100,
});

export const socketAtom = atom<Socket | null>(null);
