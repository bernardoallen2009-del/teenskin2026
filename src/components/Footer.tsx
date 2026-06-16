import Link from "next/link";
import styles from "@/styles/site.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <Link className={`${styles.logo} ${styles.footerLogo}`} href="/">
            TeensSkin
            <span>skincare jovem</span>
          </Link>
          <p>
            Rotinas simples, informação clara e produtos suaves para adolescentes que querem cuidar da pele sem
            complicar.
          </p>
        </div>
        <div className={styles.footerColumn}>
          <h3>Loja</h3>
          <Link href="/produtos">Produtos</Link>
          <Link href="/rotinas">Rotinas</Link>
          <Link href="/quiz">Quiz de pele</Link>
          <Link href="/carrinho">Carrinho</Link>
        </div>
        <div className={styles.footerColumn}>
          <h3>Marca</h3>
          <Link href="/sobre">Sobre</Link>
          <Link href="/descobrir">Descobrir</Link>
          <Link href="/ingredientes">Ingredientes</Link>
          <Link href="/problemas">Problemas de pele</Link>
          <Link href="/privacidade">Privacidade</Link>
        </div>
        <div className={styles.footerColumn}>
          <h3>Cuidado</h3>
          <Link href="/faq">FAQ</Link>
          <Link href="/envios">Envios e devoluções</Link>
          <Link href="/contactos">Contactos</Link>
          <Link href="/termos">Termos</Link>
          <Link href="/cookies">Cookies</Link>
          <p>Conteúdo educativo. Não substitui aconselhamento médico ou dermatológico.</p>
          <p>© 2026 TeensSkin</p>
        </div>
      </div>
    </footer>
  );
}
