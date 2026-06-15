"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "@/styles/site.module.css";

const slides = [
  {
    title: "Descobre a tua rotina ideal",
    eyebrow: "Skincare para adolescentes",
    text: "Produtos suaves, informação simples e recomendações pensadas para a tua pele real.",
    image: "/images/hero-routine.png",
    color: "#F7F0F5",
    href: "/quiz"
  },
  {
    title: "SPF que fica contigo",
    eyebrow: "Proteção solar diária",
    text: "Acabamento leve para escola, treino, praia e os dias em que só queres sair.",
    image: "/images/hero-spf.png",
    color: "#FFF1D7",
    href: "/produtos/sunny-spf-50"
  },
  {
    title: "Menos passos, mais pele feliz",
    eyebrow: "Rotina minimalista",
    text: "Limpar, hidratar, proteger. Depois acrescentas só o que a tua pele pedir.",
    image: "/images/hero-minimal.png",
    color: "#E8EBF7",
    href: "/produtos"
  }
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero} aria-label="Destaques TeensSkin">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.title}
          className={styles.heroSlide}
          style={{ background: slide.color }}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{slide.eyebrow}</span>
            <h1 className={styles.heroTitle}>{slide.title}</h1>
            <p className={styles.lead}>{slide.text}</p>
            <div className={styles.buttonRow}>
              <Link className={styles.primaryButton} href={slide.href}>
                Comprar agora
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className={styles.secondaryButton} href="/quiz">
                Fazer quiz
              </Link>
            </div>
          </div>
          <div className={styles.heroMedia}>
            <Image
              className={styles.heroImage}
              src={slide.image}
              width={760}
              height={760}
              priority
              alt=""
            />
          </div>
        </motion.div>
      </AnimatePresence>
      <div className={styles.sliderControls} aria-label="Slides">
        {slides.map((item, index) => (
          <button
            className={`${styles.dot} ${index === active ? styles.dotActive : ""}`}
            key={item.title}
            type="button"
            aria-label={`Ver slide ${index + 1}`}
            aria-current={index === active}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
}
