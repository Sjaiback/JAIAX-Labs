"use client";

import { useLayoutEffect, useRef } from "react";
import { AnimatedJaiaxLogo } from "./AnimatedJaiaxLogo";
import styles from "./LogoShowcase.module.css";

interface JaiaxLogoIntroProps {
  onComplete: () => void;
  onSkip: () => void;
  reducedMotion?: boolean;
}

/** Optional presentation. Mount on demand; never blocks navigation permanently. */
export function JaiaxLogoIntro({
  onComplete,
  onSkip,
  reducedMotion,
}: JaiaxLogoIntroProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const overflow = document.body.style.overflow;
    element.showModal();
    skip.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      previousFocus?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className={styles.intro}
      aria-label="Presentación de JAIAX Labs"
      onCancel={(event) => {
        event.preventDefault();
        onSkip();
      }}
    >
      <div className={styles.introContent}>
        <AnimatedJaiaxLogo
          size="min(72vw, 440px)"
          onComplete={onComplete}
          reducedMotion={reducedMotion}
        />
        <span className="eyebrow">
          IDEAS QUE SE CONVIERTEN EN POSIBILIDADES.
        </span>
      </div>
      <button ref={skip} className={styles.skip} onClick={onSkip}>
        Omitir presentación <span aria-hidden>↗</span>
      </button>
    </dialog>
  );
}
