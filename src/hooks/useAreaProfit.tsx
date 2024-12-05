"use client";
import { AreaProfitSchema } from "@/mongoose-models/AreaProfit";
import { create } from "zustand";

interface AreaProfitsState {
	areaProfits: AreaProfitSchema[];
	setAreaProfits: (profits: AreaProfitSchema[]) => void;
	addAreaProfits: (newProfit: AreaProfitSchema) => void;
	clearAreaProfits: () => void;
}

const useAreaProfitsStore = create<AreaProfitsState>((set) => ({
	areaProfits: [],
	setAreaProfits: (profits) => set({ areaProfits: profits }),
	addAreaProfits: (newProfit) =>
		set((state) => ({
			areaProfits: [newProfit, ...state.areaProfits],
		})),

	clearAreaProfits: () =>
		set({
			areaProfits: [], // Clear all profits
		}),
}));

export default useAreaProfitsStore;
