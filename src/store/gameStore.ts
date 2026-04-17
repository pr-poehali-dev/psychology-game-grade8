import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Character } from "@/data/characters";

interface GameState {
  selectedCharacter: Character | null;
  xp: number;
  level: number;
  coins: number;
  streak: number;
  setCharacter: (character: Character) => void;
  addXp: (amount: number) => void;
  addCoins: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      selectedCharacter: null,
      xp: 350,
      level: 3,
      coins: 120,
      streak: 3,
      setCharacter: (character) => set({ selectedCharacter: character }),
      addXp: (amount) =>
        set((state) => {
          const newXp = state.xp + amount;
          const newLevel = Math.floor(newXp / 500) + 1;
          return { xp: newXp, level: newLevel };
        }),
      addCoins: (amount) =>
        set((state) => ({ coins: state.coins + amount })),
      incrementStreak: () =>
        set((state) => ({ streak: state.streak + 1 })),
      resetStreak: () => set({ streak: 0 }),
    }),
    { name: "game-store" }
  )
);
