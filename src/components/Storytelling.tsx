"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "@/styles/site.module.css";

const steps = [
  {
    title: "Criada para rotinas reais",
    text: "A TeensSkin nasceu da ideia de que cuidar da pele na adolescência deve ser claro, acessível e sem pressão."
  },
  {
    title: "Menos ruído, mais consistência",
    text: "Cada produto tem um papel direto na rotina para evitar misturar ativos sem necessidade."
  },
  {
    title: "Compromisso consciente",
    text: "Fórmulas cruelty-free, embalagens recicláveis e educação sobre consumo responsável."
  }
];

export function Storytelling() {
  return (
    <section className={`${styles.section} ${styles.story}`}>
      <div className={styles.sectionInner}>
        <div className={styles.storyGrid}>
          <div className={styles.storyVisual}>
            <Image src="/images/story-brand.png" width={760} height={920} alt="Produtos TeensSkin numa bancada pastel" />
          </div>
          <div className={styles.storySteps}>
            <span className={styles.eyebrow}>A nossa história</span>
            {steps.map((step, index) => (
              <motion.article
                className={styles.storyStep}
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <h3>{step.title}</h3>
                <p className={styles.lead}>{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
