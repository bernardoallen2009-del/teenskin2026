"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products, skinQuizQuestions } from "@/data/catalog";
import styles from "@/styles/site.module.css";
import type { SkinType } from "@/types/product";

type Answers = Record<string, SkinType>;

const skinLabels: Record<SkinType, string> = {
  oleosa: "oleosa",
  mista: "mista",
  seca: "seca",
  sensivel: "sensível",
  normal: "normal"
};

export function SkinQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const question = skinQuizQuestions[step];
  const complete = Object.keys(answers).length === skinQuizQuestions.length;

  const result = useMemo<SkinType>(() => {
    const tally = Object.values(answers).reduce<Record<string, number>>((acc, value) => {
      acc[value] = (acc[value] ?? 0) + 1;
      return acc;
    }, {});
    const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    return (sorted[0]?.[0] as SkinType | undefined) ?? "normal";
  }, [answers]);

  const recommended = products
    .filter((product) => product.skinTypes.includes(result))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  function answer(value: SkinType) {
    setAnswers((current) => ({ ...current, [question.id]: value }));

    if (step < skinQuizQuestions.length - 1) {
      setStep((current) => current + 1);
    }
  }

  function saveResult() {
    window.localStorage.setItem(
      "teensskin.skin-profile.v1",
      JSON.stringify({ skinType: result, answers, savedAt: new Date().toISOString() })
    );
  }

  return (
    <div className={styles.quizShell}>
      <aside className={styles.quizPanel}>
        <span className={styles.eyebrow}>Quiz de pele</span>
        <h2 className={styles.title}>Cinco perguntas, uma rotina mais clara.</h2>
        <p className={styles.lead}>Responde com o que acontece na maioria dos dias, sem tentar acertar.</p>
        <div className={styles.progressTrack} aria-label={`Progresso ${Object.keys(answers).length} de ${skinQuizQuestions.length}`}>
          <div
            className={styles.progressFill}
            style={{ width: `${(Object.keys(answers).length / skinQuizQuestions.length) * 100}%` }}
          />
        </div>
      </aside>
      <div className={styles.quizPanel}>
        {!complete ? (
          <>
            <p className={styles.eyebrow}>
              Pergunta {step + 1} de {skinQuizQuestions.length}
            </p>
            <h1 className={styles.title}>{question.question}</h1>
            <div className={styles.answerGrid}>
              {question.options.map((option) => (
                <button
                  className={styles.answerButton}
                  type="button"
                  key={option.label}
                  onClick={() => answer(option.value as SkinType)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.resultPanel}>
            <span className={styles.eyebrow}>Resultado</span>
            <h1 className={styles.title}>A tua pele parece ser {skinLabels[result]}.</h1>
            <p className={styles.lead}>
              Começa por uma rotina simples e observa a pele durante duas semanas antes de acrescentar novos ativos.
            </p>
            <div className={styles.buttonRow}>
              <button className={styles.primaryButton} type="button" onClick={saveResult}>
                Guardar recomendação
              </button>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => {
                  setAnswers({});
                  setStep(0);
                }}
              >
                Refazer quiz
              </button>
            </div>
          </div>
        )}
        {complete ? (
          <div className={`${styles.productGrid}`} style={{ marginTop: "1.5rem" }}>
            {recommended.map((product) => (
              <ProductCard product={product} key={product.id} compact />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
