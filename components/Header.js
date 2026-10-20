"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import site from "@/content/site.json";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { ArrowUpRight, ChevronIcon, PhoneIcon } from "./Icons";
import styles from "./Header.module.css";

const { header, logo } = site;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = window.__lenis;
    document.body.style.overflow = open ? "hidden" : "";
    if (lenis) open ? lenis.stop() : lenis.start();

    const menu = menuRef.current;
    if (open && menu && !prefersReducedMotion()) {
      gsap.fromTo(
        menu.querySelectorAll("[data-menu-item]"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "power3.out", delay: 0.15 }
      );
    }

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${hidden && !open ? styles.hidden : ""}`}
    >
      <a href="#main" className={styles.skip}>
        {header.skipLink}
      </a>
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.logo} aria-label={logo.alt} onClick={close}>
          <Logo label={logo.alt} />
        </a>

        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.navList}>
            {header.nav.map((item) => (
              <li key={item.label} className={styles.navItem}>
                <a href={item.href} className={styles.navLink} aria-haspopup={item.children ? "true" : undefined}>
                  {item.label}
                  {item.children && <ChevronIcon className={styles.chev} />}
                </a>
                {item.children && (
                  <div className={styles.dropdown}>
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a href={child.href}>
                            {child.label}
                            <ArrowUpRight />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={header.phone.href} className={styles.phone}>
            <PhoneIcon />
            <span>{header.phone.label}</span>
          </a>
          <a href={header.cta.href} className={`btn ${styles.cta}`}>
            {header.cta.label}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? header.menuClose : header.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.menu} ${open ? styles.menuOpen : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className={`container ${styles.menuInner}`}>
          <ul className={styles.menuList}>
            {header.nav.map((item) => (
              <li key={item.label} data-menu-item>
                <a href={item.href}>{item.label}</a>
                {item.children && (
                  <ul className={styles.menuSub}>
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a href={child.href}>{child.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.menuFoot} data-menu-item>
            <a href={header.cta.href} className="btn" onClick={close}>
              {header.cta.label}
            </a>
            <a href={header.phone.href} className={styles.menuPhone}>
              <PhoneIcon />
              {header.phone.label}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
