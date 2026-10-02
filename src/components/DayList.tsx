import { MealItem } from "./MealItem";
import styles from "./DayList.module.css";

export type DayMeal = {
  id: string;
  time: string;
  name: string;
  status: "on" | "off";
};

type DayListProps = {
  date: string;
  meals: DayMeal[];
};

export function DayList({ date, meals }: DayListProps) {
  return (
    <section className={styles.dayList}>
      <h2 className={styles.date}>{date}</h2>
      <div className={styles.meals}>
        {meals.map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            time={meal.time}
            name={meal.name}
            status={meal.status}
          />
        ))}
      </div>
    </section>
  );
}
