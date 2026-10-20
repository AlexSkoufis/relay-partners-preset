"use client";

import { useRef } from "react";
import home from "@/content/home.json";
import site from "@/content/site.json";
import Rich from "@/components/Rich";
import Magnetic from "@/components/Magnetic";
import { ArrowUpRight, MailIcon, PhoneIcon } from "@/components/Icons";
import { gsap, useGsap } from "@/lib/gsap";
import styles from "./ContactCta.module.css";

const { contactCta } = home;
const { contact } = site;

export default function ContactCta() {
  const root = useRef(null);

  useGsap((el) => {
    gsap.from(el.querySelectorAll("[data-reveal]"), {
      y: 50,
      opacity: 0,
      duration: 1.1,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 70%" },
    });
    gsap.fromTo(
      el.querySelector("[data-motif]"),
      { rotate: -20, scale: 0.8 },
      { rotate: 0, scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true } }
    );
  }, root);

  return (
    <section id="contact" ref={root} className={`${styles.contact} on-dark`} aria-labelledby="contact-title">
      <svg data-motif className={styles.motif} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M1 18L10 4h4L5 18z M8 22L17 8h4l-9 14z" />
      </svg>
      <div className={`container ${styles.inner}`}>
        <p className="label" data-reveal>
          {contactCta.label}
        </p>
        <h2 id="contact-title" className={styles.title} data-reveal>
          <Rich text={contactCta.title} />
        </h2>
        <p className={styles.text} data-reveal>
          {contactCta.text}
        </p>

        <div className={styles.actions} data-reveal>
          <Magnetic strength={0.25}>
            <a href={contact.booking.href} target="_blank" rel="noopener noreferrer" className={`btn ${styles.book}`}>
              {contactCta.primaryCta.label}
              <span className="btn-arrow">
                <ArrowUpRight />
              </span>
            </a>
          </Magnetic>
        </div>

        <div className={styles.channels} data-reveal>
          <a href={contact.phone.href} className={styles.channel}>
            <span className={styles.channelIcon}>
              <PhoneIcon />
            </span>
            <span>
              <span className={styles.channelLabel}>{contactCta.phoneLabel}</span>
              <span className={styles.channelValue}>{contact.phone.label}</span>
            </span>
          </a>
          <a href={contact.email.href} className={styles.channel}>
            <span className={styles.channelIcon}>
              <MailIcon />
            </span>
            <span>
              <span className={styles.channelLabel}>{contactCta.emailLabel}</span>
              <span className={styles.channelValue}>{contact.email.label}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
