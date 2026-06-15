"use client";

import { FormEvent, useEffect, useState } from "react";
import { LogIn, Trash2, UserPlus } from "lucide-react";
import { loginProfile, registerProfile } from "@/lib/api";
import styles from "@/styles/site.module.css";

const tokenKey = "teensskin.auth-token.v1";
const userKey = "teensskin.user.v1";

type StoredUser = {
  name: string;
  email: string;
};

export function AuthPanel() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [user, setUser] = useState<StoredUser | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [skinProfile, setSkinProfile] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      const saved = window.localStorage.getItem(userKey);
      const profile = window.localStorage.getItem("teensskin.skin-profile.v1");
      setUser(saved ? (JSON.parse(saved) as StoredUser) : null);
      setSkinProfile(profile);
    });
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    try {
      const payload =
        mode === "login"
          ? await loginProfile(form.email, form.password)
          : await registerProfile(form.name, form.email, form.password);

      window.localStorage.setItem(tokenKey, payload.token);
      window.localStorage.setItem(userKey, JSON.stringify(payload.user));
      setUser(payload.user);
      setStatus("Sessão iniciada neste navegador.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Não foi possível continuar.");
    }
  }

  function clearData() {
    window.localStorage.removeItem(tokenKey);
    window.localStorage.removeItem(userKey);
    window.localStorage.removeItem("teensskin.skin-profile.v1");
    setUser(null);
    setSkinProfile(null);
    setStatus("Dados locais apagados.");
  }

  if (user) {
    return (
      <div className={styles.profilePanel}>
        <span className={styles.eyebrow}>Perfil</span>
        <h1 className={styles.title}>Olá, {user.name}</h1>
        <p className={styles.lead}>Sessão guardada no localStorage deste navegador, conforme pedido no PDF.</p>
        <div className={styles.detailPanel}>
          <h2>Dados pessoais</h2>
          <p>{user.email}</p>
        </div>
        <div className={styles.detailPanel}>
          <h2>Recomendação do quiz</h2>
          <p>{skinProfile ? JSON.parse(skinProfile).skinType : "Ainda não guardaste uma recomendação."}</p>
        </div>
        <button className={styles.dangerButton} type="button" onClick={clearData}>
          <Trash2 size={17} aria-hidden="true" />
          Apagar dados locais
        </button>
        {status ? <p className={styles.status}>{status}</p> : null}
      </div>
    );
  }

  return (
    <form className={styles.profilePanel} onSubmit={submit}>
      <span className={styles.eyebrow}>Conta</span>
      <h1 className={styles.title}>{mode === "login" ? "Iniciar sessão" : "Criar conta"}</h1>
      <p className={styles.lead}>Autenticação simples com JWT para preparar perfil, histórico e recomendações.</p>
      <div className={styles.authMeta}>
        <button
          className={`${styles.chip} ${mode === "login" ? styles.selected : ""}`}
          type="button"
          aria-pressed={mode === "login"}
          onClick={() => setMode("login")}
        >
          <LogIn size={16} aria-hidden="true" />
          Entrar
        </button>
        <button
          className={`${styles.chip} ${mode === "register" ? styles.selected : ""}`}
          type="button"
          aria-pressed={mode === "register"}
          onClick={() => setMode("register")}
        >
          <UserPlus size={16} aria-hidden="true" />
          Criar
        </button>
      </div>
      <div className={styles.formGrid}>
        {mode === "register" ? (
          <label className={styles.filterGroup}>
            <span>Nome</span>
            <input
              className={styles.input}
              required
              value={form.name}
              minLength={2}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            />
          </label>
        ) : null}
        <label className={styles.filterGroup}>
          <span>Email</span>
          <input
            className={styles.input}
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
        </label>
        <label className={styles.filterGroup}>
          <span>Password</span>
          <input
            className={styles.input}
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          />
        </label>
      </div>
      <button className={styles.primaryButton} type="submit">
        {mode === "login" ? "Entrar" : "Criar conta"}
      </button>
      {status ? (
        <p className={styles.status} role="status">
          {status}
        </p>
      ) : null}
    </form>
  );
}
