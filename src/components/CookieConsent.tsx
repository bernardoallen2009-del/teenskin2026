"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/site.module.css";

const key = "teensskin.cookie-consent.v1";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setVisible(window.localStorage.getItem(key) !== "accepted");
    });
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.cookieBanner} role="region" aria-label="Consentimento de cookies">
      <div>
        <strong>Cookies essenciais e preferências</strong>
        <p>
          Usamos armazenamento local para carrinho, favoritos, sessão e preferências. Podes apagar estes dados no perfil.
        </p>
      </div>
      <button
        className={styles.smallButton}
        type="button"
        onClick={() => {
          window.localStorage.setItem(key, "accepted");
          setVisible(false);
        }}
      >
        Aceitar
      </button>
    </div>
  );
}
