import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { loadMeals, saveMeals } from "../lib/storage";
import { computeStats, type DietStats } from "../lib/stats";
import type { Meal, MealInput } from "../types/meal";

type MealsContextValue = {
  meals: Meal[];
  stats: DietStats;
  getMeal: (id: string) => Meal | undefined;
  addMeal: (input: MealInput) => Meal;
  updateMeal: (id: string, input: MealInput) => Meal | undefined;
  deleteMeal: (id: string) => void;
};

const MealsContext = createContext<MealsContextValue | null>(null);

export function MealsProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>(() => loadMeals());

  const persist = useCallback((next: Meal[]) => {
    setMeals(next);
    saveMeals(next);
  }, []);

  const addMeal = useCallback(
    (input: MealInput) => {
      const meal: Meal = { ...input, id: crypto.randomUUID() };
      persist([meal, ...meals]);
      return meal;
    },
    [meals, persist],
  );

  const updateMeal = useCallback(
    (id: string, input: MealInput) => {
      let updated: Meal | undefined;
      const next = meals.map((meal) => {
        if (meal.id !== id) return meal;
        updated = { ...meal, ...input };
        return updated;
      });
      persist(next);
      return updated;
    },
    [meals, persist],
  );

  const deleteMeal = useCallback(
    (id: string) => {
      persist(meals.filter((meal) => meal.id !== id));
    },
    [meals, persist],
  );

  const getMeal = useCallback(
    (id: string) => meals.find((meal) => meal.id === id),
    [meals],
  );

  const stats = useMemo(() => computeStats(meals), [meals]);

  const value = useMemo(
    () => ({ meals, stats, getMeal, addMeal, updateMeal, deleteMeal }),
    [meals, stats, getMeal, addMeal, updateMeal, deleteMeal],
  );

  return (
    <MealsContext.Provider value={value}>{children}</MealsContext.Provider>
  );
}

export function useMeals() {
  const context = useContext(MealsContext);
  if (!context) {
    throw new Error("useMeals must be used within MealsProvider");
  }
  return context;
}
