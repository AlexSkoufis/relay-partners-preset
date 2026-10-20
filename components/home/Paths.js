"use client";

import { useRef } from "react";
import home from "@/content/home.json";
import Rich from "@/components/Rich";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { gsap, useGsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./Paths.module.css";

const { paths } = home;

const panelRules = paths.items
  .map((item) => `[data-paths]:has(input[value="${item.key}"]:checked) [data-panel="${item.key}"]{display:block}`)
  .join("");

export default function Paths() {
  const root = useRef(null);

  useGsap((el) => {
    gsap.from(el.querySelectorAll("[data-opt]"), {
      x: -40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.07,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 70%" },
    });
  }, root);

  const choose = (key) => {
    if (prefersReducedMotion()) return;
    requestAnimationFrame(() => {
      const panel = root.current?.querySelector(`[data-panel="${key}"]`);
      if (!panel) return;
      gsap.fromTo(
        panel.querySelectorAll("[data-anim]"),
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out", overwrite: true }
      );
    });
  };

  return (
    <section ref={root} className={`${styles.paths} on-dark`} aria-labelledby="paths-title">
      <div className="container">
        <div className={styles.head}>
          <p className="label">{paths.label}</p>
          <h2 id="paths-title" className={styles.title}>
            <Rich text={paths.title} />
          </h2>
          <p className={styles.intro}>{paths.intro}</p>
        </div>

        {/* Panel visibility is driven by CSS so the selector also works without JavaScript. */}
        <style>{panelRules}</style>
        <div className={styles.layout} data-paths>
          <fieldset className={styles.options}>
            <legend className="sr-only">{paths.label}</legend>
            {paths.items.map((item, i) => (
              <label key={item.key} data-opt className={styles.option}>
                <input
                  type="radio"
                  name="exit-path"
                  value={item.key}
                  defaultChecked={i === 0}
                  onChange={() => choose(item.key)}
                />
                <span className={styles.optNum}>0{i + 1}</span>
                <span className={styles.optText}>{item.tab}</span>
                <span className={styles.optArrow}>
                  <ArrowIcon />
                </span>
              </label>
            ))}
          </fieldset>

          <div className={styles.panels} aria-live="polite">
            {paths.items.map((item) => (
              <article
                key={item.key}
                data-panel={item.key}
                className={styles.panel}
              >
                <h3 data-anim>{item.title}</h3>
                <p data-anim>{item.text}</p>
                <ul>
                  {item.points.map((pt) => (
                    <li key={pt} data-anim>
                      <CheckIcon />
                      {pt}
                    </li>
                  ))}
                </ul>
                <a data-anim href={paths.cta.href} className="btn">
                  {paths.cta.label}
                  <span className="btn-arrow">
                    <ArrowIcon />
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
