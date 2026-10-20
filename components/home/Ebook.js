"use client";

import { useRef } from "react";
import Logo from "../Logo";
import home from "@/content/home.json";
import { ArrowIcon } from "@/components/Icons";
import { gsap, useGsap } from "@/lib/gsap";
import styles from "./Ebook.module.css";

const { ebook } = home;

export default function Ebook() {
  const root = useRef(null);

  useGsap((el) => {
    gsap.fromTo(
      el.querySelector("[data-cover]"),
      { rotate: -8, y: 80 },
      { rotate: 4, y: -30, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
    );
  }, root);

  return (
    <section ref={root} className={styles.ebook} aria-labelledby="ebook-title">
      <div className="container">
        <div className={`${styles.card} on-dark`}>
          <div className={styles.copy}>
            <p className="label">{ebook.label}</p>
            <h2 id="ebook-title" className={styles.title}>
              {ebook.title}
            </h2>
            <p className={styles.text}>{ebook.text}</p>
            <p className={styles.author}>{ebook.author}</p>
            <a href={ebook.cta.href} className="btn">
              {ebook.cta.label}
              <span className="btn-arrow">
                <ArrowIcon style={{ transform: "rotate(90deg)" }} />
              </span>
            </a>
          </div>
          <div className={styles.media}>
            <div data-cover className={styles.cover}>
              <div className={styles.book} role="img" aria-label={ebook.cover.alt}>
                <span className={styles.bookTag}>{ebook.cover.tag}</span>
                <span className={styles.bookTitle}>{ebook.title}</span>
                <span className={styles.bookAuthor}>{ebook.author}</span>
                <span className={styles.bookBrand}>
                  <Logo label="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
