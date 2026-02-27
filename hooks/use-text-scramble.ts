"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

export function useTextScramble(text: string, trigger: boolean, speed = 30) {
  const [displayed, setDisplayed] = useState(text);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const iterRef = useRef(0);

  const scramble = useCallback(() => {
    iterRef.current = 0;
    lastRef.current = performance.now();

    const step = (now: number) => {
      if (now - lastRef.current < speed) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      lastRef.current = now;

      const result = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iterRef.current) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayed(result);
      iterRef.current += 0.5;

      if (iterRef.current <= text.length) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, [text, speed]);

  useEffect(() => {
    if (trigger) scramble();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, scramble]);

  return displayed;
}
