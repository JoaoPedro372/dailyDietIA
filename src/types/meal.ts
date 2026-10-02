export type Meal = {
  id: string;
  name: string;
  description: string;
  datetime: string; // ISO
  onDiet: boolean;
};

export type MealInput = Omit<Meal, "id">;
