"use client"
import { create } from "zustand";
import { UserInfo } from "../types";

interface UserStore {
    user: UserInfo | null,
    setUser: (newData: UserInfo| null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (newData: UserInfo | null) => set({user: newData})
}));