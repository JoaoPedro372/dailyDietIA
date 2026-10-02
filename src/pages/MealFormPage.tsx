import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell, PageHeader } from "../components/AppShell";
import { Button } from "../components/Button";
import { useMeals } from "../context/MealsContext";
import {
  combineDateAndTime,
  nowDateInput,
  nowTimeInput,
  toDateInputValue,
  toTimeInputValue,
} from "../lib/dates";
import styles from "./MealFormPage.module.css";

export function MealFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { getMeal, addMeal, updateMeal } = useMeals();
  const existing = id ? getMeal(id) : undefined;

  const initial = useMemo(() => {
    if (existing) {
      return {
        name: existing.name,
        description: existing.description,
        date: toDateInputValue(existing.datetime),
        time: toTimeInputValue(existing.datetime),
        onDiet: existing.onDiet,
      };
    }
    return {
      name: "",
      description: "",
      date: nowDateInput(),
      time: nowTimeInput(),
      onDiet: true as boolean | null,
    };
  }, [existing]);

  const [name, setName] = useState(initial.name);
  const [description, setDescription] = useState(initial.description);
  const [date, setDate] = useState(initial.date);
  const [time, setTime] = useState(initial.time);
  const [onDiet, setOnDiet] = useState<boolean | null>(
    existing ? existing.onDiet : null,
  );
  const [error, setError] = useState("");

  if (isEditing && !existing) {
    return (
      <AppShell>
        <PageHeader title="Refeição" backTo="/" />
        <p className={styles.missing}>Refeição não encontrada.</p>
      </AppShell>
    );
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !date || !time || onDiet === null) {
      setError("Preencha nome, data, hora e se está dentro da dieta.");
      return;
    }

    const payload = {
      name: name.trim(),
      description: description.trim(),
      datetime: combineDateAndTime(date, time),
      onDiet,
    };

    if (isEditing && id) {
      updateMeal(id, payload);
      navigate(`/meal/${id}`);
      return;
    }

    const created = addMeal(payload);
    navigate("/feedback", { state: { onDiet: created.onDiet } });
  }

  return (
    <AppShell>
      <PageHeader
        title={isEditing ? "Editar refeição" : "Nova refeição"}
        backTo={isEditing && id ? `/meal/${id}` : "/"}
      />

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>Nome</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={60}
            required
          />
        </label>

        <label className={styles.field}>
          <span>Descrição</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            maxLength={200}
          />
        </label>

        <div className={styles.row}>
          <label className={styles.field}>
            <span>Data</span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </label>
          <label className={styles.field}>
            <span>Hora</span>
            <input
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              required
            />
          </label>
        </div>

        <fieldset className={styles.fieldset}>
          <legend>Está dentro da dieta?</legend>
          <div className={styles.dietRow}>
            <button
              type="button"
              className={[
                styles.dietOption,
                onDiet === true ? styles.dietOnActive : "",
              ].join(" ")}
              onClick={() => setOnDiet(true)}
            >
              <span className={[styles.dot, styles.on].join(" ")} />
              Sim
            </button>
            <button
              type="button"
              className={[
                styles.dietOption,
                onDiet === false ? styles.dietOffActive : "",
              ].join(" ")}
              onClick={() => setOnDiet(false)}
            >
              <span className={[styles.dot, styles.off].join(" ")} />
              Não
            </button>
          </div>
        </fieldset>

        {error ? <p className={styles.error}>{error}</p> : null}

        <div className={styles.footer}>
          <Button type="submit">
            {isEditing ? "Salvar alterações" : "Cadastrar refeição"}
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
