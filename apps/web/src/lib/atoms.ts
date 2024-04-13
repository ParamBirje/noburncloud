import { atom } from "jotai";

export const requirementsAtom = atom("");
export const architectureAtom = atom({
  prompt: "",
  components: [],
});
export const chatHistoryAtom = atom<ChatHistoryContent[]>([]);
export const iterationAtom = atom<Iteration[]>([]);
export const notificationsAtom = atom<string[]>([]);
