// src/stores/areaProfitStore.ts
import { AreaProfitSchema } from "@/mongoose-models/AreaProfit";
import { createStore } from "zustand/vanilla";

export type AreaProfitState = {
  areaProfits: AreaProfitSchema[];
  setAreaProfits: (areaProfits: AreaProfitSchema[] | undefined) => void;
};

export const createAreaProfitStore = () => {
  return createStore<AreaProfitState>()((set) => ({
    areaProfits: [],
    setAreaProfits: (areaProfits) => set({ areaProfits }),
  }));
};
