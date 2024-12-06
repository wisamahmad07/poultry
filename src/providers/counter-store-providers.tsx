// src/providers/area-profit-store-provider.tsx
"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type AreaProfitState,
  createAreaProfitStore,
} from "@/stores/counter-store";

export type AreaProfitStoreApi = ReturnType<typeof createAreaProfitStore>;

export const AreaProfitStoreContext = createContext<
  AreaProfitStoreApi | undefined
>(undefined);

export interface AreaProfitStoreProviderProps {
  children: ReactNode;
}

export const AreaProfitStoreProvider = ({
  children,
}: AreaProfitStoreProviderProps) => {
  const storeRef = useRef<AreaProfitStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createAreaProfitStore();
  }

  return (
    <AreaProfitStoreContext.Provider value={storeRef.current}>
      {children}
    </AreaProfitStoreContext.Provider>
  );
};

export const useAreaProfitStore = <T,>(
  selector: (store: AreaProfitState) => T
): T => {
  const areaProfitStoreContext = useContext(AreaProfitStoreContext);

  if (!areaProfitStoreContext) {
    throw new Error(
      `useAreaProfitStore must be used within AreaProfitStoreProvider`
    );
  }

  return useStore(areaProfitStoreContext, selector);
};
