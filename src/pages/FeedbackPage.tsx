import { Link, useLocation, Navigate } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { Button } from "../components/Button";
import styles from "./FeedbackPage.module.css";

type FeedbackState = {
  onDiet?: boolean;
};

export function FeedbackPage() {
  const location = useLocation();
  const state = (location.state ?? {}) as FeedbackState;

  if (typeof state.onDiet !== "boolean") {
    return <Navigate to="/" replace />;
  }

  const onDiet = state.onDiet;

  return (
    <AppShell>
      <div className={styles.page}>
        <div className={styles.copy}>
          <h1 className={onDiet ? styles.success : styles.fail}>
            {onDiet ? "Continue assim!" : "Que pena!"}
          </h1>
          <p>
            {onDiet ? (
              <>
                Você continua <strong>dentro da dieta</strong>. Muito bem!
              </>
            ) : (
              <>
                Você <strong>saiu da dieta</strong> dessa vez, mas continue se
                esforçando e na próxima você consegue!
              </>
            )}
          </p>
        </div>

        <div className={styles.illustration} aria-hidden="true">
          {onDiet ? "🥗" : "🍕"}
        </div>

        <Link to="/" className={styles.link}>
          <Button>Ir para a página inicial</Button>
        </Link>
      </div>
    </AppShell>
  );
}
