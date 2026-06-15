import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { categories } from "@/data/catalog";
import styles from "@/styles/site.module.css";

export function CategoryGrid() {
  return (
    <div className={styles.categoryGrid}>
      {categories.map((category) => (
        <Link
          className={styles.categoryCard}
          href={`/produtos?categoria=${category.id}`}
          key={category.id}
          style={{ "--category-bg": category.accent } as CSSProperties}
        >
          <Image
            className={styles.categoryImage}
            src={category.image}
            width={260}
            height={180}
            alt=""
          />
          <h3>{category.name}</h3>
          <p>{category.description}</p>
        </Link>
      ))}
    </div>
  );
}
