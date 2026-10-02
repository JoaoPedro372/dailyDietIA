import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/home/avatar.png";
import logo from "../assets/home/logo.svg";
import plusIcon from "../assets/home/plus.svg";
import { AppShell } from "./AppShell";
import { Button } from "./Button";
import { DayList } from "./DayList";
import { PercentCard } from "./PercentCard";
import { useMeals } from "../context/MealsContext";
import { formatDateKey, formatTime } from "../lib/dates";
import { formatPercent } from "../lib/stats";
import styles from "./Home.module.css";

export function Home() {
  const navigate = useNavigate();
  const { meals, stats } = useMeals();

  const days = useMemo(() => {
    const groups = new Map<string, ReturnType<typeof mapMeal>[]>();

    const sorted = [...meals].sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
    );

    for (const meal of sorted) {
      const key = formatDateKey(meal.datetime);
      const list = groups.get(key) ?? [];
      list.push(mapMeal(meal));
      groups.set(key, list);
    }

    return Array.from(groups.entries()).map(([date, dayMeals]) => ({
      date,
      meals: dayMeals,
    }));
  }, [meals]);

  return (
    <AppShell>
      <div className={styles.page}>
        <header className={styles.header}>
          <img src={logo} alt="Daily Diet" width={82} height={37} />
          <img
            src={avatar}
            alt="Foto do perfil"
            width={40}
            height={40}
            className={styles.avatar}
          />
        </header>

        <div className={styles.content}>
          {meals.length > 0 ? (
            <PercentCard
              percent={formatPercent(stats.percentOnDiet)}
              label="das refeições dentro da dieta"
              positive={stats.isPositive}
            />
          ) : (
            <div className={styles.emptyStats}>
              <p>Comece registrando suas refeições</p>
            </div>
          )}

          <div className={styles.mealsSection}>
            <div className={styles.newMeal}>
              <p className={styles.sectionTitle}>Refeições</p>
              <Button
                icon={<img src={plusIcon} alt="" width={18} height={18} />}
                onClick={() => navigate("/meal/new")}
              >
                Nova refeição
              </Button>
            </div>

            {days.length === 0 ? (
              <p className={styles.emptyList}>Nenhuma refeição cadastrada ainda.</p>
            ) : (
              days.map((day) => (
                <DayList key={day.date} date={day.date} meals={day.meals} />
              ))
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function mapMeal(meal: { id: string; name: string; datetime: string; onDiet: boolean }) {
  return {
    id: meal.id,
    time: formatTime(meal.datetime),
    name: meal.name,
    status: meal.onDiet ? ("on" as const) : ("off" as const),
  };
}
