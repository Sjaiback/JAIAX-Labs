"use client";

import { animate, createScope } from "animejs";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";

/** Delegated interactions: one pointer handler and one RAF, with no per-frame React renders. */
export function ExperienceMotion() {
  const pathname = usePathname();
  const progress = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0,
      pointerFrame = 0;
    let current: HTMLElement | null = null;
    let x = 0,
      y = 0;
    const touched = new Set<HTMLElement>();
    const scope = createScope();
    const reset = (element: HTMLElement | null) => {
      if (!element) return;
      for (const key of ["--tilt-x", "--tilt-y", "--magnet-x", "--magnet-y"])
        element.style.setProperty(key, "0");
    };
    const scroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const article = document.querySelector<HTMLElement>(
          "[data-reading-body]",
        );
        const start = article
          ? article.getBoundingClientRect().top + scrollY - 120
          : 0;
        const distance = article
          ? article.offsetHeight - innerHeight * 0.6
          : document.documentElement.scrollHeight - innerHeight;
        const value = Math.max(
          0,
          Math.min(1, (scrollY - start) / Math.max(1, distance)),
        );
        if (progress.current)
          progress.current.style.transform = `scaleX(${value})`;
        if (back.current) back.current.hidden = scrollY < 650;
        frame = 0;
      });
    };
    const pointer = (event: PointerEvent) => {
      if (reduce.matches || !fine.matches || event.pointerType === "touch")
        return;
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              ".service-card,.project-cover,.price-card,.journal-card,.button-gold,.nav-cta",
            )
          : null;
      if (target !== current) {
        reset(current);
        current = target;
      }
      if (!target) return;
      x = event.clientX;
      y = event.clientY;
      touched.add(target);
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        if (current) {
          const r = current.getBoundingClientRect();
          const dx = (x - r.left) / r.width - 0.5,
            dy = (y - r.top) / r.height - 0.5;
          current.style.setProperty("--spot-x", `${x - r.left}px`);
          current.style.setProperty("--spot-y", `${y - r.top}px`);
          current.style.setProperty("--tilt-x", `${-dy * 3}`);
          current.style.setProperty("--tilt-y", `${dx * 3}`);
          if (current.matches(".button-gold,.nav-cta")) {
            current.style.setProperty("--magnet-x", `${dx * 7}`);
            current.style.setProperty("--magnet-y", `${dy * 5}`);
          }
        }
        pointerFrame = 0;
      });
    };
    const leave = () => {
      reset(current);
      current = null;
    };
    const click = (event: MouseEvent) => {
      if (reduce.matches || event.detail === 0) return;
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(".button-gold")
          : null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "interaction-ripple";
      ripple.setAttribute("aria-hidden", "true");
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      target.append(ripple);
      scope.add(() => {
        animate(ripple, {
          scale: [0, 1],
          opacity: [0.25, 0],
          duration: 650,
          ease: "out(3)",
          onComplete: () => ripple.remove(),
        });
      });
    };
    const resize = new ResizeObserver(scroll);
    resize.observe(document.body);
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("pointermove", pointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("click", click);
    reduce.addEventListener("change", leave);
    fine.addEventListener("change", leave);
    scroll();
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      resize.disconnect();
      scope.revert();
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("pointermove", pointer);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("click", click);
      reduce.removeEventListener("change", leave);
      fine.removeEventListener("change", leave);
      touched.forEach(reset);
      document
        .querySelectorAll(".interaction-ripple")
        .forEach((el) => el.remove());
    };
  }, [pathname]);
  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <div ref={progress} />
      </div>
      <button
        ref={back}
        className="back-top"
        hidden
        aria-label="Volver al inicio de la página"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
          })
        }
      >
        <ArrowUp size={17} />
      </button>
    </>
  );
}
