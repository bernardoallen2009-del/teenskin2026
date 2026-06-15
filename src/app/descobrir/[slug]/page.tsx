import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { articles, getArticleBySlug } from "@/data/catalog";
import styles from "@/styles/site.module.css";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return article
    ? {
        title: article.title,
        description: article.excerpt
      }
    : { title: "Artigo" };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <section className={styles.pageIntro}>
        <div className={styles.sectionInner}>
          <Breadcrumbs items={[{ href: "/descobrir", label: "Descobrir" }, { label: article.title }]} />
          <span className={styles.eyebrow}>{article.readTime}</span>
          <h1 className={styles.pageTitle}>{article.title}</h1>
          <p className={styles.lead}>{article.excerpt}</p>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.highlight}>
            <div className={styles.highlightMedia}>
              <Image src={article.image} width={760} height={620} alt="" />
            </div>
            <article className={styles.detailPanel}>
              <h2>Sumário</h2>
              <ul className={styles.bulletList}>
                {article.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
