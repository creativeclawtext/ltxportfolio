"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { Badge } from "@/components/ui/badge";

const NAV_ITEMS = [
  { label: "AI Video", href: "#ai-video" },
  { label: "Brand & Social", href: "#brand-social" },
  { label: "AI & Agentic", href: "#ai-portfolio" },
  { label: "Film & Interactive", href: "#film" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  function handleNavClick() {
    setMobileOpen(false);
  }

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-white/85 backdrop-blur-xl"
      />
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 left-0 right-0 h-px bg-ltx-rule"
      />

      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-ltx-black"
        >
          JAMES McKAY
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ltx-muted hover:text-ltx-black transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <Badge
            variant="outline"
            className="border-ltx-studio text-ltx-studio text-xs font-medium"
          >
            Built with LTX-2
          </Badge>
        </div>

        {/* Mobile hamburger / close toggle */}
        <button
          className="md:hidden relative z-10 flex flex-col justify-center items-center w-10 h-10 -mr-2"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <motion.span
            className="block w-5 h-[2px] bg-ltx-black rounded-full"
            animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ position: "absolute" }}
          />
          <motion.span
            className="block w-5 h-[2px] bg-ltx-black rounded-full"
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.15 }}
            style={{ position: "absolute" }}
          />
          <motion.span
            className="block w-5 h-[2px] bg-ltx-black rounded-full"
            animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ position: "absolute" }}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-ltx-rule shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pt-2 pb-6 flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="block py-3 text-lg font-[family-name:var(--font-display)] font-medium text-ltx-black border-b border-ltx-rule/50 last:border-0 hover:text-ltx-studio transition-colors"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{
                    duration: 0.25,
                    delay: 0.05 * i,
                    ease: "easeOut",
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                className="pt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Badge
                  variant="outline"
                  className="border-ltx-studio text-ltx-studio text-xs font-medium"
                >
                  Built with LTX-2
                </Badge>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
