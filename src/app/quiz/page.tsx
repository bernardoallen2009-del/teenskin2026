import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SkinQuiz } from "@/components/SkinQuiz";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Quiz de pele",
  description: "Quiz de cinco perguntas para recomendar uma rotina TeensSkin por tipo de pele."
};

export default function QuizPage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "Quiz" }]} />
          <span className={styles.eyebrow}>Diagnóstico leve</span>
          <h1 className={styles.pageTitle}>Descobre uma rotina feita para o teu dia a dia.</h1>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <SkinQuiz />
        </div>
      </section>
    </>
  );
}
