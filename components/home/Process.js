"use client";

import { useLayoutEffect, useRef } from "react";
import home from "@/content/home.json";
import Rich from "@/components/Rich";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./Process.module.css";

const { process: proc } = home;

export default function Process() {
  const root = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const el = root.current;
    const mm = gsap.matchMedia();

    // Desktop: pin the section and move the steps sideways as the visitor scrolls.
    mm.add("(min-width: 1041px)", () => {
      el.classList.add(styles.horizontal);
      const distance = () => track.current.scrollWidth - track.current.parentElement.clientWidth;
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        el.classList.remove(styles.horizontal);
        gsap.set(track.current, { clearProps: "transform" });
      };
    });

    // Smaller screens: simple staggered reveal.
    mm.add("(max-width: 1040px)", () => {
      gsap.from(el.querySelectorAll("[data-step]"), {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: track.current, start: "top 82%" },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="process" ref={root} className={styles.process} aria-labelledby="process-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <div>
            <p className="label">{proc.label}</p>
            <h2 id="process-title" className={styles.title}>
              <Rich text={proc.title} />
            </h2>
          </div>
          <div className={styles.progress} aria-hidden="true">
            <span className={styles.hint}>{proc.hint}</span>
            <span className={styles.barWrap}>
              <span ref={bar} className={styles.bar} />
            </span>
          </div>
        </div>

        <div className={styles.viewport}>
          <ol ref={track} className={styles.track}>
            {proc.steps.map((step, i) => (
              <li key={step.number} data-step className={styles.step}>
                <div className={styles.stepTop}>
                  <span className={styles.stepNum}>{step.number}</span>
                  <span className={styles.stepLine} aria-hidden="true" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <svg className={styles.stepArt} viewBox="0 0 120 120" aria-hidden="true">
                  {Array.from({ length: 4 }).map((_, b) => (
                    <rect
                      key={b}
                      x={10 + b * 27}
                      y={100 - (b + 1) * 20}
                      width="20"
                      height={(b + 1) * 20}
                      rx="4"
                      className={b <= i ? styles.barOn : styles.barOff}
                    />
                  ))}
                </svg>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
