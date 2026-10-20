"use client";

import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Runs `setup` inside a gsap.context scoped to `scopeRef` and reverts it on unmount.
// Animations are skipped entirely when the visitor prefers reduced motion,
// so content always stays in its final, visible state.
export function useGsap(setup, scopeRef, deps = []) {
  useIsoLayoutEffect(() => {
    if (!scopeRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => setup(scopeRef.current), scopeRef);
    return () => ctx.revert();
  }, deps);
}

export { gsap, ScrollTrigger };
