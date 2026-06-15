"use client";

import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { dictionary } from "@/lib/i18n";
import styles from "@/styles/site.module.css";

const navItems = [
  { href: "/produtos", label: dictionary.pt.navProducts },
  { href: "/sobre", label: dictionary.pt.navAbout },
  { href: "/descobrir", label: dictionary.pt.navDiscover },
  { href: "/quiz", label: dictionary.pt.navQuiz }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { cartCount, favourites } = useCart();

  return (
    <>
      <div className={styles.topBar}>{dictionary.pt.campaign}</div>
      <header className={styles.header}>
        <div className={styles.headerShell}>
          <button
            className={styles.menuButton}
            type="button"
            aria-label="Abrir menu de navegação"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <nav className={styles.navLeft} aria-label="Navegação principal">
            {navItems.slice(0, 3).map((item) => (
              <Link className={styles.navLink} href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className={styles.logo} href="/" aria-label="TeensSkin - página inicial">
            TeensSkin
            <span>skincare jovem</span>
          </Link>
          <div className={styles.navRight}>
            <label className={styles.searchBox}>
              <Search size={17} aria-hidden="true" />
              <span className={styles.srOnly}>Pesquisar produtos</span>
              <input type="search" placeholder="Pesquisar" aria-label="Pesquisar produtos" />
            </label>
            <div className={styles.iconGroup}>
              <Link className={styles.iconButton} href="/perfil" aria-label="Conta e perfil">
                <UserRound size={19} aria-hidden="true" />
              </Link>
              <Link className={styles.iconButton} href="/produtos?favoritos=1" aria-label="Favoritos">
                <Heart size={19} aria-hidden="true" />
                {favourites.length > 0 ? <span className={styles.cartBadge}>{favourites.length}</span> : null}
              </Link>
              <Link className={styles.iconButton} href="/carrinho" aria-label="Carrinho">
                <ShoppingBag size={19} aria-hidden="true" />
                {cartCount > 0 ? <span className={styles.cartBadge}>{cartCount}</span> : null}
              </Link>
            </div>
          </div>
        </div>
      </header>
      <button
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        type="button"
        aria-label="Fechar menu"
        onClick={() => setOpen(false)}
      />
      <aside className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`} aria-hidden={!open}>
        <button
          className={`${styles.iconButton} ${styles.mobileClose}`}
          type="button"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
        >
          <X size={20} aria-hidden="true" />
        </button>
        {navItems.map((item) => (
          <Link className={styles.navLink} href={item.href} key={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link className={styles.navLink} href="/carrinho" onClick={() => setOpen(false)}>
          {dictionary.pt.navCart}
        </Link>
      </aside>
    </>
  );
}
