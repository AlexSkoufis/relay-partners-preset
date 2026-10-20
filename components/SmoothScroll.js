"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export default function SmoothScroll() {
  const barRef = useRef(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    let lenis = null;
    let tick = null;

    if (!reduce) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Placeholder links (href="#") stay put; in-page anchors scroll smoothly.
    const onClick = (e) => {
      const link = e.target.closest("a[href^='#']");
      if (!link) return;
      const hash = link.getAttribute("href");
      if (hash === "#") {
        e.preventDefault();
        return;
      }
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -24 });
      else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    const onScroll = () => {
      if (!barRef.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      if (tick) gsap.ticker.remove(tick);
      if (lenis) lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "var(--green)",
        transformOrigin: "0 50%",
        transform: "scaleX(0)",
        zIndex: 200,
        pointerEvents: "none",
      }}
    />
  );
}
