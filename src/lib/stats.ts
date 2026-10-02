import type { Meal } from "../types/meal";

export type DietStats = {
  total: number;
  onDiet: number;
  offDiet: number;
  percentOnDiet: number;
  bestSequence: number;
  isPositive: boolean;
};

export function computeStats(meals: Meal[]): DietStats {
  const sorted = [...meals].sort(
    (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime(),
  );

  const total = sorted.length;
  const onDiet = sorted.filter((meal) => meal.onDiet).length;
  const offDiet = total - onDiet;
  const percentOnDiet = total === 0 ? 0 : (onDiet / total) * 100;

  let bestSequence = 0;
  let current = 0;
  for (const meal of sorted) {
    if (meal.onDiet) {
      current += 1;
      bestSequence = Math.max(bestSequence, current);
    } else {
      current = 0;
    }
  }

  return {
    total,
    onDiet,
    offDiet,
    percentOnDiet,
    bestSequence,
    isPositive: percentOnDiet >= 50,
  };
}

export function formatPercent(value: number) {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%`;
}
