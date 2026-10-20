"use client";

import { useRef } from "react";
import home from "@/content/home.json";
import Rich from "@/components/Rich";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { gsap, useGsap } from "@/lib/gsap";
import styles from "./Services.module.css";

const { services } = home;

export default function Services() {
  const root = useRef(null);

  useGsap((el) => {
    gsap.from(el.querySelectorAll("[data-panel]"), {
      y: 70,
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: el.querySelector("[data-panels]"), start: "top 82%" },
    });
  }, root);

  return (
    <section id="services" ref={root} className={styles.services} aria-labelledby="services-title">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="label">{services.label}</p>
            <h2 id="services-title" className={styles.title}>
              <Rich text={services.title} />
            </h2>
          </div>
          <div className={styles.headSide}>
            <p className={styles.intro}>{services.intro}</p>
            <a href={services.cta.href} className="btn btn--dark">
              {services.cta.label}
              <span className="btn-arrow">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>

        {/* Panels expand on hover or keyboard focus; the first one is open by default. Pure CSS. */}
        <div data-panels className={styles.panels}>
          {services.items.map((item) => (
            <article key={item.name} data-panel tabIndex={0} className={styles.panel}>
              <div className={styles.panelTop}>
                <span className={styles.num}>{item.number}</span>
                <span className={styles.icon} aria-hidden="true">
                  <ArrowIcon />
                </span>
              </div>
              <div className={styles.panelBody}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.summary}>{item.summary}</p>
                <ul className={styles.points}>
                  {item.points.map((pt) => (
                    <li key={pt}>
                      <CheckIcon />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
