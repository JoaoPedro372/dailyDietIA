import { Link } from "react-router-dom";
import divider from "../assets/home/divider.svg";
import styles from "./MealItem.module.css";

export type MealStatus = "on" | "off";

type MealItemProps = {
  id: string;
  time: string;
  name: string;
  status: MealStatus;
};

export function MealItem({ id, time, name, status }: MealItemProps) {
  return (
    <Link to={`/meal/${id}`} className={styles.meal}>
      <span className={styles.time}>{time}</span>
      <img src={divider} alt="" width={1} height={14} className={styles.divider} />
      <span className={styles.name}>{name}</span>
      <span
        className={[styles.statusDot, status === "on" ? styles.on : styles.off].join(
          " ",
        )}
        aria-label={status === "on" ? "Dentro da dieta" : "Fora da dieta"}
      />
    </Link>
  );
}
