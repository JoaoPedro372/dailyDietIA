import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell, PageHeader } from "../components/AppShell";
import { Button } from "../components/Button";
import { useMeals } from "../context/MealsContext";
import { formatDateLong, formatTime } from "../lib/dates";
import styles from "./MealDetailPage.module.css";

export function MealDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { getMeal, deleteMeal } = useMeals();
  const meal = getMeal(id);
  const [confirming, setConfirming] = useState(false);

  if (!meal) {
    return (
      <AppShell>
        <PageHeader title="Refeição" backTo="/" />
        <p className={styles.missing}>Refeição não encontrada.</p>
      </AppShell>
    );
  }

  function handleDelete() {
    deleteMeal(meal!.id);
    navigate("/");
  }

  return (
    <AppShell>
      <PageHeader title="Refeição" backTo="/" />

      <div className={styles.content}>
        <div className={styles.block}>
          <h2>{meal.name}</h2>
          <p>{meal.description || "Sem descrição."}</p>
        </div>

        <div className={styles.block}>
          <h3>Data e hora</h3>
          <p>
            {formatDateLong(meal.datetime)} às {formatTime(meal.datetime)}
          </p>
        </div>

        <div
          className={[
            styles.tag,
            meal.onDiet ? styles.on : styles.off,
          ].join(" ")}
        >
          <span className={styles.dot} />
          {meal.onDiet ? "dentro da dieta" : "fora da dieta"}
        </div>

        <div className={styles.actions}>
          <Button onClick={() => navigate(`/meal/${meal.id}/edit`)}>
            Editar refeição
          </Button>
          <Button variant="secondary" onClick={() => setConfirming(true)}>
            Excluir refeição
          </Button>
        </div>
      </div>

      {confirming ? (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal} role="dialog" aria-modal="true">
            <p>Deseja realmente excluir o registro da refeição?</p>
            <div className={styles.modalActions}>
              <Button variant="secondary" onClick={() => setConfirming(false)}>
                Cancelar
              </Button>
              <Button onClick={handleDelete}>Sim, excluir</Button>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
