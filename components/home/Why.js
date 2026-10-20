"use client";

import { useRef } from "react";
import home from "@/content/home.json";
import { ArrowIcon } from "@/components/Icons";
import { gsap, useGsap } from "@/lib/gsap";
import styles from "./Why.module.css";

const { why } = home;

export default function Why() {
  const root = useRef(null);

  useGsap((el) => {
    gsap.fromTo(
      el.querySelectorAll("[data-word]"),
      { opacity: 0.18 },
      {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: { trigger: el.querySelector("[data-statement]"), start: "top 80%", end: "bottom 50%", scrub: true },
      }
    );
    gsap.from(el.querySelectorAll("[data-signal]"), {
      x: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: el.querySelector("[data-signals]"), start: "top 80%" },
    });
  }, root);

  return (
    <section ref={root} className={styles.why} aria-labelledby="why-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.side}>
          <p className="label">{why.label}</p>
          <h2 id="why-title" data-statement className={styles.statement}>
            {why.statement.split(" ").map((word, i) => (
              <span key={i} data-word>
                {word}{" "}
              </span>
            ))}
          </h2>
          <a href={why.cta.href} className={`text-link ${styles.cta}`}>
            {why.cta.label}
            <ArrowIcon width="18" height="18" />
          </a>
        </div>

        <div className={styles.list}>
          <h3 className={styles.listTitle}>{why.signalsTitle}</h3>
          <ol data-signals className={styles.signals}>
            {why.signals.map((s, i) => (
              <li key={s.title} data-signal className={styles.signal}>
                <span className={styles.num}>0{i + 1}</span>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
