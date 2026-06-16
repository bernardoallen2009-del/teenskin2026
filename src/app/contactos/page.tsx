import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Contactos",
  description: "Contactos e apoio TeensSkin."
};

export default function ContactPage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "Contactos" }]} />
          <span className={styles.eyebrow}>Ajuda</span>
          <h1 className={styles.pageTitle}>Fala connosco.</h1>
          <p className={styles.lead}>Para dúvidas de encomendas, produtos ou rotinas, usa o email de apoio.</p>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <article className={styles.detailPanel}>
            <h2>Apoio ao cliente</h2>
            <p>Resposta habitual em 1 a 2 dias úteis.</p>
            <a className={styles.primaryButton} href="mailto:apoio@teensskin.pt">
              <Mail size={18} aria-hidden="true" />
              apoio@teensskin.pt
            </a>
          </article>
        </div>
      </section>
    </>
  );
}

