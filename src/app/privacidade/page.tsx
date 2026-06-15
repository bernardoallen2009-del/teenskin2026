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
                A versão local guarda carrinho, favoritos, consentimento de cookies, sessão e resultado do quiz no
                navegador. A API aceita newsletter, contacto e autenticação de demonstração.
              </p>
            </article>
            <article className={styles.detailPanel}>
              <h2>Direito ao apagamento</h2>
              <p>
                Podes apagar dados locais no perfil. Numa base de dados real, a rota DELETE /api/users/me serve como
                ponto de partida para pedidos RGPD.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
