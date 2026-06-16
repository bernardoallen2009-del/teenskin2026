import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import styles from "@/styles/site.module.css";

const concerns = [
  {
    title: "Borbulhas",
    text: "Limpa sem esfregar, hidrata e usa cuidados pontuais. Evita mexer na pele para reduzir marcas."
  },
  {
    title: "Oleosidade",
    text: "Escolhe texturas leves e mantém hidratação. Secar demasiado a pele pode aumentar desconforto."
  },
  {
    title: "Pele seca",
    text: "Usa limpeza suave e creme com ingredientes reparadores. Se arder, simplifica a rotina."
  },
  {
    title: "Pele sensível",
    text: "Introduz um produto de cada vez e evita perfumes fortes, esfoliação agressiva e excesso de ativos."
  }
];

export const metadata: Metadata = {
  title: "Problemas de pele",
  description: "Guias simples para acne, oleosidade, pele seca e pele sensível."
};

export default function SkinConcernsPage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "Problemas de pele" }]} />
          <span className={styles.eyebrow}>Guias rápidos</span>
          <h1 className={styles.pageTitle}>Entende o que a tua pele está a pedir.</h1>
        </div>
      </section>
      <section className={styles.section}>
        <div className={`${styles.sectionInner} ${styles.valuesGrid}`}>
          {concerns.map((item) => (
            <article className={styles.valueCard} key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

