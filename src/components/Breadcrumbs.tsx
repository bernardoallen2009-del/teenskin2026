import Link from "next/link";
import styles from "@/styles/site.module.css";

type Breadcrumb = {
  href?: string;
  label: string;
};

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
      <Link href="/">Home</Link>
      {items.map((item) => (
        <span key={item.label}>
          <span aria-hidden="true">/</span>{" "}
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
