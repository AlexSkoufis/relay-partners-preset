"use client";

import { useEffect, useRef } from "react";
import home from "@/content/home.json";
import Rich from "@/components/Rich";
import Magnetic from "@/components/Magnetic";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { gsap, useGsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./Hero.module.css";

const { hero } = home;

// Milestone positions on the chart, as % of the visual box.
const POINTS = [
  { x: 22, y: 77, side: "right" },
  { x: 45, y: 60, side: "right" },
  { x: 67, y: 40, side: "left" },
  { x: 90, y: 17, side: "left" },
];

export default function Hero() {
  const root = useRef(null);
  const card = useRef(null);

  useGsap(
    (el) => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.1 });
      tl.from(el.querySelectorAll("[data-line] > span"), { yPercent: 110, duration: 1.2, stagger: 0.09 })
        .from(el.querySelectorAll("[data-fade]"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.8")
        .from(card.current, { y: 60, opacity: 0, rotateX: 8, duration: 1.3 }, "-=1.1")
        .from(el.querySelectorAll("[data-draw]"), { strokeDashoffset: 1, duration: 1.8, ease: "power2.inOut", stagger: 0.2 }, "-=0.9")
        .from(el.querySelector("[data-area]"), { opacity: 0, duration: 1 }, "-=1")
        .from(el.querySelectorAll("[data-point]"), { scale: 0, opacity: 0, duration: 0.6, stagger: 0.18, ease: "back.out(2.4)" }, "-=1.5");

      // Gentle parallax of the backdrop while scrolling away.
      gsap.to(el.querySelector("[data-glow]"), {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    },
    root
  );

  // Pointer tilt on the roadmap card.
  useEffect(() => {
    const el = card.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(hover: hover)").matches) return;
    const rx = gsap.quickTo(el, "rotateX", { duration: 0.8, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotateY", { duration: 0.8, ease: "power3.out" });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 10);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section id="top" ref={root} className={`${styles.hero} on-dark`}>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.grid} />
        <div data-glow className={styles.glow} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="label" data-fade>
            {hero.eyebrow}
          </p>
          <h1 className={styles.title}>
            {hero.titleLines.map((line, i) => (
              <span key={i} data-line className={styles.line}>
                <span>
                  <Rich text={line} />
                </span>
              </span>
            ))}
          </h1>
          <p className={styles.lead} data-fade>
            {hero.lead}
          </p>
          <div className={styles.ctas} data-fade>
            <Magnetic>
              <a href={hero.primaryCta.href} className="btn">
                {hero.primaryCta.label}
                <span className="btn-arrow">
                  <ArrowIcon />
                </span>
              </a>
            </Magnetic>
            <a href={hero.secondaryCta.href} className="btn btn--ghost">
              {hero.secondaryCta.label}
            </a>
          </div>
          <ul className={styles.trust} data-fade>
            {hero.trust.map((t) => (
              <li key={t}>
                <CheckIcon />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visualWrap}>
          <figure ref={card} className={styles.card}>
            <figcaption className={styles.cardHead}>
              <span>{hero.visual.title}</span>
              <span className={styles.tag}>{hero.visual.tag}</span>
            </figcaption>

            <div className={styles.chart}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#e0a526" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#e0a526" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[20, 40, 60, 80].map((y) => (
                  <line key={y} x1="0" x2="100" y1={y} y2={y} className={styles.gridLine} />
                ))}
                <path
                  data-area
                  d="M4 90 C 14 88, 18 80, 22 77 S 36 64, 45 60 S 58 47, 67 40 S 84 22, 90 17 L 90 96 L 4 96 Z"
                  fill="url(#heroArea)"
                />
                <path
                  data-draw
                  pathLength="1"
                  d="M4 90 C 30 89, 60 87, 90 84"
                  className={styles.flat}
                />
                <path
                  data-draw
                  pathLength="1"
                  d="M4 90 C 14 88, 18 80, 22 77 S 36 64, 45 60 S 58 47, 67 40 S 84 22, 90 17"
                  className={styles.curve}
                />
              </svg>

              {POINTS.map((p, i) => (
                <div
                  key={i}
                  data-point
                  className={`${styles.point} ${styles[p.side]} ${i === POINTS.length - 1 ? styles.pointEnd : ""}`}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span className={styles.dot} />
                  <span className={styles.pointLabel}>{hero.visual.milestones[i]}</span>
                </div>
              ))}

              <span className={styles.legendWith}>{hero.visual.withPlan}</span>
              <span className={styles.legendWithout}>{hero.visual.withoutPlan}</span>
            </div>

            <div className={styles.axes}>
              <span>{hero.visual.axisX}</span>
              <span>{hero.visual.axisY} ↑</span>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
