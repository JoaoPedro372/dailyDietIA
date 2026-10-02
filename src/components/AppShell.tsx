import { Link } from "react-router-dom";
import styles from "./AppShell.module.css";

type AppShellProps = {
  children: React.ReactNode;
  tone?: "default" | "positive" | "negative";
};

export function AppShell({ children, tone = "default" }: AppShellProps) {
  return (
    <div className={[styles.shell, styles[tone]].join(" ")}>
      <div className={styles.frame}>{children}</div>
    </div>
  );
}

type PageHeaderProps = {
  title?: string;
  backTo?: string;
  onBack?: () => void;
  action?: React.ReactNode;
  tone?: "default" | "positive" | "negative" | "plain";
};

export function PageHeader({
  title,
  backTo = "/",
  onBack,
  action,
  tone = "plain",
}: PageHeaderProps) {
  return (
    <header className={[styles.header, styles[`header-${tone}`]].join(" ")}>
      {onBack ? (
        <button type="button" className={styles.back} onClick={onBack} aria-label="Voltar">
          ←
        </button>
      ) : (
        <Link to={backTo} className={styles.back} aria-label="Voltar">
          ←
        </Link>
      )}
      {title ? <h1 className={styles.title}>{title}</h1> : <span />}
      <div className={styles.action}>{action}</div>
    </header>
  );
}
