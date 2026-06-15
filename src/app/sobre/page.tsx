import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Sobre",
  description: "História, missão e valores da TeensSkin."
};

const values = [
  ["Simplicidade", "Rotinas curtas que adolescentes conseguem manter."],
  ["Segurança", "Fórmulas suaves, notas de uso e educação sem alarmismo."],
  ["Acessibilidade", "Informação clara para jovens, pais e cuidadores."],
  ["Consciência", "Embalagens recicláveis e compras sem pressão."]
];

export default function AboutPage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "Sobre" }]} />
          <span className={styles.eyebrow}>Marca</span>
          <h1 className={styles.pageTitle}>Skincare jovem, claro e bonito sem exageros.</h1>
          <p className={styles.lead}>
            Inspirada por referências minimalistas e sofisticadas, a TeensSkin cria rotinas simples para pele adolescente.
          </p>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.highlight}>
            <div className={styles.highlightMedia}>
              <Image src="/images/about-team.png" width={760} height={760} alt="Equipa TeensSkin em estúdio pastel" />
            </div>
            <div className={styles.highlightContent}>
              <span className={styles.eyebrow}>Missão</span>
              <h2 className={styles.title}>Ajudar adolescentes a cuidar da pele com confiança.</h2>
              <p className={styles.lead}>
                A nossa abordagem começa pelo básico: limpeza suave, hidratação e proteção solar. A partir daí, cada
                recomendação é explicada com linguagem simples, sem promessas mágicas.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.softSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.valuesGrid}>
            {values.map(([title, text]) => (
              <article className={styles.valueCard} key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
