"use client";

import { useRef } from "react";
import Image from "next/image";
import home from "@/content/home.json";
import { gsap, useGsap } from "@/lib/gsap";
import styles from "./Journey.module.css";

const { journey, stats } = home;

export default function Journey() {
  const root = useRef(null);

  useGsap((el) => {
    const frame = el.querySelector("[data-frame]");
    gsap.fromTo(
      frame,
      { clipPath: "inset(5% 4% 5% 4% round 32px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 95%", end: "top 25%", scrub: true },
      }
    );
    gsap.fromTo(
      el.querySelector("[data-img]"),
      { scale: 1.25, yPercent: -6 },
      { scale: 1, yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
    );
    gsap.from(el.querySelectorAll("[data-quote] > span"), {
      yPercent: 100,
      opacity: 0,
      duration: 1.1,
      stagger: 0.04,
      ease: "power4.out",
      scrollTrigger: { trigger: el.querySelector("[data-quote]"), start: "top 75%" },
    });

    el.querySelectorAll("[data-count]").forEach((node) => {
      const end = Number(node.dataset.count);
      const obj = { v: end > 100 ? end - 40 : 0 };
      gsap.to(obj, {
        v: end,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: { trigger: node, start: "top 90%" },
        onUpdate: () => {
          node.textContent = Math.round(obj.v);
        },
      });
    });
  }, root);

  return (
    <section ref={root} className={`${styles.journey} on-dark`} aria-label={journey.cite}>
      <div data-frame className={styles.frame}>
        <div data-img className={styles.img}>
          <Image src={journey.image.src} alt={journey.image.alt} fill sizes="100vw" />
        </div>
        <div className={styles.shade} />

        <div className={`container ${styles.content}`}>
          <blockquote className={styles.quote}>
            <p data-quote>
              {journey.quote.split(" ").map((w, i) => (
                <span key={i}>{w} </span>
              ))}
            </p>
            <footer>{journey.cite}</footer>
          </blockquote>

          <ul className={styles.stats}>
            {stats.items.map((s) => (
              <li key={s.label}>
                <span className={styles.value}>
                  <span data-count={s.value}>{s.value}</span>
                  {s.suffix}
                </span>
                <span className={styles.statLabel}>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
