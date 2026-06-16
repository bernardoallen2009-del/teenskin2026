import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import styles from "@/styles/site.module.css";

const faqs = [
  ["Preciso de uma rotina grande?", "Não. Para começar, limpeza suave, hidratante e SPF já são uma boa base."],
  ["Posso usar ativos todos os dias?", "Depende da pele. Introduz um ativo de cada vez e pausa se houver ardor persistente."],
  ["O SPF é mesmo necessário?", "Sim, especialmente de manhã. Ajuda a proteger a pele e a prevenir manchas."],
  ["Quando devo pedir ajuda?", "Se houver dor, irritação forte, acne intensa ou insegurança com a pele, fala com um adulto e procura aconselhamento profissional."]
];

export const metadata: Metadata = {
  title: "FAQ",
  description: "Perguntas frequentes sobre TeensSkin, rotinas e cuidados de pele."
};

export default function FaqPage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "FAQ" }]} />
          <span className={styles.eyebrow}>Perguntas frequentes</span>
          <h1 className={styles.pageTitle}>Respostas rápidas antes de complicar.</h1>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.storySteps}>
            {faqs.map(([question, answer]) => (
              <article className={styles.detailPanel} key={question}>
                <h2>{question}</h2>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

