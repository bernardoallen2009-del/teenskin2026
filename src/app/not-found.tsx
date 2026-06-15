import Link from "next/link";
import styles from "@/styles/site.module.css";

export default function NotFound() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.emptyState}>
          <h1>Página não encontrada</h1>
          <p className={styles.muted}>A rotina certa existe, mas este URL não.</p>
          <Link className={styles.primaryButton} href="/">
            Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  );
}
