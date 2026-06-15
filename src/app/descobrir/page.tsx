import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { articles } from "@/data/catalog";
import styles from "@/styles/site.module.css";

export const metadata: Metadata = {
  title: "Descobrir",
  description: "Artigos TeensSkin sobre rotinas, ingredientes e cuidado de pele adolescente."
};

export default function DiscoverPage() {
  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ label: "Descobrir" }]} />
          <span className={styles.eyebrow}>Blog</span>
          <h1 className={styles.pageTitle}>Guias rápidos para perceber a tua pele.</h1>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.articleGrid}>
            {articles.map((article) => (
              <article className={styles.articleCard} key={article.slug}>
                <Image className={styles.articleImage} src={article.image} width={560} height={420} alt="" />
                <div className={styles.articleBody}>
                  <span className={styles.eyebrow}>
                    {new Intl.DateTimeFormat("pt-PT", { dateStyle: "medium" }).format(new Date(article.date))} ·{" "}
                    {article.readTime}
                  </span>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                  <Link className={styles.secondaryButton} href={`/descobrir/${article.slug}`}>
                    Ler artigo
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
