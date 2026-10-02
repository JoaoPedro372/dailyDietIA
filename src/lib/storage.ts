import type { Meal } from "../types/meal";

const STORAGE_KEY = "daily-diet:meals";

const seedMeals: Meal[] = [
  {
    id: "seed-1",
    name: "X-tudo",
    description: "Sanduíche completo com hambúrguer, queijo e bacon.",
    datetime: "2022-08-12T20:00:00",
    onDiet: false,
  },
  {
    id: "seed-2",
    name: "Whey protein com leite",
    description: "Shake pós-treino.",
    datetime: "2022-08-12T16:00:00",
    onDiet: true,
  },
  {
    id: "seed-3",
    name: "Salada cesar com frango grelhado",
    description: "Almoço leve com proteína.",
    datetime: "2022-08-12T12:30:00",
    onDiet: true,
  },
  {
    id: "seed-4",
    name: "Vitamina de banana com abacate",
    description: "Café da manhã nutritivo.",
    datetime: "2022-08-12T09:30:00",
    onDiet: true,
  },
  {
    id: "seed-5",
    name: "X-tudo",
    description: "Sanduíche completo com hambúrguer, queijo e bacon.",
    datetime: "2022-08-11T20:00:00",
    onDiet: false,
  },
  {
    id: "seed-6",
    name: "Whey protein com leite",
    description: "Shake pós-treino.",
    datetime: "2022-08-11T16:00:00",
    onDiet: true,
  },
  {
    id: "seed-7",
    name: "Salada cesar com frango grelhado",
    description: "Almoço leve com proteína.",
    datetime: "2022-08-11T12:30:00",
    onDiet: true,
  },
  {
    id: "seed-8",
    name: "Vitamina de banana com abacate",
    description: "Café da manhã nutritivo.",
    datetime: "2022-08-11T09:30:00",
    onDiet: true,
  },
];

export function loadMeals(): Meal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedMeals));
      return seedMeals;
    }
    return JSON.parse(raw) as Meal[];
  } catch {
    return seedMeals;
  }
}

export function saveMeals(meals: Meal[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(meals));
}
