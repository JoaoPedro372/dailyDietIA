import { Link } from "react-router-dom";
import openIcon from "../assets/home/open.svg";
import styles from "./PercentCard.module.css";

type PercentCardProps = {
  percent: string;
  label: string;
  positive?: boolean;
  to?: string;
};

export function PercentCard({
  percent,
  label,
  positive = true,
  to = "/statistics",
}: PercentCardProps) {
  return (
    <Link
      to={to}
      className={[styles.card, positive ? styles.positive : styles.negative].join(
        " ",
      )}
    >
      <p className={styles.percent}>{percent}</p>
      <p className={styles.label}>{label}</p>
      <img src={openIcon} alt="" width={24} height={24} className={styles.open} />
    </Link>
  );
}
