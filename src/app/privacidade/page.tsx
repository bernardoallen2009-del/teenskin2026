import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Política de privacidade e RGPD da TeensSkin."
};

export default function PrivacyPage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "Privacidade" }]} />
          <span className={styles.eyebrow}>RGPD</span>
          <h1 className={styles.pageTitle}>Privacidade simples e controlo dos teus dados.</h1>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.splitGrid}>
            <article className={styles.detailPanel}>
              <h2>Dados usados</h2>
              <p>
                A versão atual guarda carrinho, favoritos, consentimento de cookies, sessão e resultado do quiz neste
                navegador. Os formulários estão preparados para ligação futura a uma base de dados segura.
              </p>
            </article>
            <article className={styles.detailPanel}>
              <h2>Direito ao apagamento</h2>
              <p>
                Podes apagar os dados locais no perfil. Em produção, os pedidos de apagamento devem ser ligados à base
                de dados e tratados conforme as regras RGPD.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
