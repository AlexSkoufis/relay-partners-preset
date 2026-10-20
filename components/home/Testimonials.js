"use client";

import { useEffect, useRef, useState } from "react";
import home from "@/content/home.json";
import Rich from "@/components/Rich";
import { ArrowIcon } from "@/components/Icons";
import { gsap, useGsap, prefersReducedMotion } from "@/lib/gsap";
import styles from "./Testimonials.module.css";

const { testimonials } = home;
const items = testimonials.items;

const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

export default function Testimonials() {
  const root = useRef(null);
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  useGsap((el) => {
    gsap.from(el.querySelectorAll("[data-reveal]"), {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 75%" },
    });
  }, root);

  // Keep the counter in sync with native (swipe / trackpad) scrolling.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => setIndex(Math.round(track.scrollLeft / track.clientWidth));
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i) => {
    const track = trackRef.current;
    const next = (i + items.length) % items.length;
    track.scrollTo({ left: next * track.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <section ref={root} className={styles.testimonials} aria-labelledby="testimonials-title">
      <div className={`container ${styles.inner}`}>
        <div>
          <p className="label" data-reveal>
            {testimonials.label}
          </p>
          <h2 id="testimonials-title" className={styles.title} data-reveal>
            <Rich text={testimonials.title} />
          </h2>
        </div>

        <div className={styles.stage} data-reveal>
          <span className={styles.mark} aria-hidden="true">
            &ldquo;
          </span>
          <div ref={trackRef} className={styles.track} tabIndex={0} aria-label={testimonials.label}>
            {items.map((item, i) => (
              <figure key={item.name} className={styles.quote} aria-hidden={i !== index || undefined}>
                <blockquote>
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption>
                  <span className={styles.initials} aria-hidden="true">
                    {initials(item.name)}
                  </span>
                  <span>
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className={styles.controls}>
            <div className={styles.dots}>
              {items.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                  aria-label={t.name}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <div className={styles.arrows}>
              <span className={styles.count}>
                {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              <button type="button" className={styles.arrow} aria-label={testimonials.prev} onClick={() => goTo(index - 1)}>
                <ArrowIcon style={{ transform: "rotate(180deg)" }} />
              </button>
              <button type="button" className={styles.arrow} aria-label={testimonials.next} onClick={() => goTo(index + 1)}>
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
