import type { Metadata } from "next";
import { AuthPanel } from "@/components/AuthPanel";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Perfil",
  description: "Perfil TeensSkin com preferências, dados locais e recomendação do quiz."
};

export default function ProfilePage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "Perfil" }]} />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <AuthPanel />
        </div>
      </section>
    </>
  );
}
