import { AppShell, PageHeader } from "../components/AppShell";
import { useMeals } from "../context/MealsContext";
import { formatPercent } from "../lib/stats";
import styles from "./StatisticsPage.module.css";

export function StatisticsPage() {
  const { stats } = useMeals();
  const tone = stats.isPositive ? "positive" : "negative";

  return (
    <AppShell tone={tone}>
      <PageHeader backTo="/" tone={tone} />
      <div className={[styles.hero, styles[tone]].join(" ")}>
        <p className={styles.percent}>{formatPercent(stats.percentOnDiet)}</p>
        <p className={styles.subtitle}>das refeições dentro da dieta</p>
      </div>

      <div className={styles.panel}>
        <h2 className={styles.heading}>Estatísticas gerais</h2>

        <div className={styles.cardWide}>
          <strong>{stats.bestSequence}</strong>
          <span>melhor sequência de pratos dentro da dieta</span>
        </div>

        <div className={styles.cardWide}>
          <strong>{stats.total}</strong>
          <span>refeições registradas</span>
        </div>

        <div className={styles.row}>
          <div className={[styles.cardHalf, styles.on].join(" ")}>
            <strong>{stats.onDiet}</strong>
            <span>refeições dentro da dieta</span>
          </div>
          <div className={[styles.cardHalf, styles.off].join(" ")}>
            <strong>{stats.offDiet}</strong>
            <span>refeições fora da dieta</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
