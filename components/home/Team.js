"use client";

import { useRef } from "react";
import Image from "next/image";
import home from "@/content/home.json";
import Rich from "@/components/Rich";
import { ArrowIcon } from "@/components/Icons";
import { gsap, useGsap } from "@/lib/gsap";
import styles from "./Team.module.css";

const { team } = home;

export default function Team() {
  const root = useRef(null);

  useGsap((el) => {
    const photo = el.querySelector("[data-photo]");
    gsap.fromTo(
      photo,
      { clipPath: "inset(100% 0% 0% 0% round 28px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 28px)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: photo, start: "top 80%" },
      }
    );
    gsap.fromTo(
      photo.querySelector("img"),
      { yPercent: -6, scale: 1.15 },
      { yPercent: 6, scale: 1.05, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
    );
    gsap.from(el.querySelectorAll("[data-reveal]"), {
      y: 36,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: el.querySelector("[data-copy]"), start: "top 78%" },
    });
  }, root);

  const { lead } = team;

  return (
    <section ref={root} className={styles.team} aria-labelledby="team-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.media}>
          <div data-photo className={styles.photo}>
            <Image
              src={lead.image.src}
              alt={lead.image.alt}
              width={lead.image.width}
              height={lead.image.height}
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeName}>{lead.name}</span>
            <span className={styles.badgeRole}>{lead.role}</span>
          </div>
        </div>

        <div data-copy className={styles.copy}>
          <p className="label" data-reveal>
            {team.label}
          </p>
          <h2 id="team-title" className={styles.title} data-reveal>
            <Rich text={team.title} />
          </h2>

          <ul className={styles.designations} data-reveal>
            {lead.designations.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          {lead.bio.map((p, i) => (
            <p key={i} className={styles.bio} data-reveal>
              {p}
            </p>
          ))}

          <ul className={styles.members} data-reveal>
            {team.members.map((m) => (
              <li key={m.name}>
                <span className={styles.avatar}>
                  <Image src={m.image.src} alt={m.image.alt} width={m.image.width} height={m.image.height} sizes="64px" />
                </span>
                <span>
                  <strong>{m.name}</strong>
                  <span>{m.role}</span>
                </span>
              </li>
            ))}
          </ul>

          <div data-reveal>
            <a href={team.cta.href} className="btn btn--dark">
              {team.cta.label}
              <span className="btn-arrow">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
