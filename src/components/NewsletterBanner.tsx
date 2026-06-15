"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { postNewsletter } from "@/lib/api";
import styles from "@/styles/site.module.css";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus(null);

    try {
      await postNewsletter(email);
      setStatus("Subscrição recebida. Prometemos enviar só o que vale a pena.");
      setEmail("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Tenta novamente dentro de momentos.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className={styles.newsletter}>
      <div className={`${styles.sectionInner} ${styles.newsletterGrid}`}>
        <div>
          <span className={styles.eyebrow}>Dicas e promoções</span>
          <h2 className={styles.title}>Recebe lembretes simples para cuidares da pele.</h2>
          <p className={styles.lead}>Sem spam, sem promessas impossíveis. Só rotinas, SPF e novidades úteis.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label className={styles.srOnly} htmlFor="newsletter-email">
              Email
            </label>
            <input
              className={styles.input}
              id="newsletter-email"
              type="email"
              placeholder="o-teu-email@exemplo.com"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
            <button className={styles.primaryButton} type="submit" disabled={busy}>
              <Mail size={17} aria-hidden="true" />
              {busy ? "A enviar" : "Subscrever"}
            </button>
          </div>
          <p className={styles.fieldNote}>
            Podes cancelar a subscrição a qualquer momento. Dados tratados conforme RGPD.
          </p>
          {status ? (
            <p className={styles.status} role="status">
              {status}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
