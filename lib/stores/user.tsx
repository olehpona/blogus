"use client"
import { create, type StoreApi, useStore } from "zustand";
import { createStore } from 'zustand/vanilla'
import { UserInfo } from "../types";
import { createContext, type ReactNode, useContext, useRef } from "react";

interface UserStore {
    user: UserInfo | null,
    setUser: (newData: UserInfo| null) => void
}

export const createUserStore = () =>  createStore<UserStore>((set) => ({
  user: null,
  setUser: (newData: UserInfo | null) => set({user: newData})
}));

export const UserStoreContext = createContext<StoreApi<UserStore> | null>(
  null
);

export interface UserStoreProviderProps {
  children: ReactNode;
}

export const UserStoreContextProvider = ({
  children,
}: UserStoreProviderProps) => {
  const storeRef = useRef<StoreApi<UserStore>>();
  if (!storeRef.current) {
    storeRef.current = createUserStore();
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (store: UserStore) => T,): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useUserStore must be use within UserStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};