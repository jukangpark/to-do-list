import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: { "To Do": [], Doing: [], Done: [] },
});

export const isDarkState = atom({
  key: "isDark",
  default: false,
});

export const isLoggedInState = atom({
  key: "isLoggedIn",
  default: false,
});
