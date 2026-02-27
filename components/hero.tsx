"use client";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden px-6 pt-32 pb-16">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="orb orb-pink" style={{ top: "10%", left: "15%" }} />
        <div
          className="orb orb-lavender"
          style={{ top: "40%", right: "10%" }}
        />
        <div className="orb orb-sky" style={{ bottom: "15%", left: "40%" }} />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <div className="relative">
          <motion.h1
            variants={fadeInUp}
            className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.95]"
          >
            <span className="gradient-text">AI Video</span>
            <span className="text-ltx-black"> and Creative</span>
            <br />
            <span className="text-ltx-black">Technologist</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-8 text-lg md:text-xl text-ltx-body max-w-2xl mx-auto leading-relaxed"
          >
            Two decades of creating and producing.
            <br />
            AI-native workflows.
            <br />
            Videos that hold attention.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="hidden md:block absolute right-0 top-1/2 translate-x-8 lg:translate-x-16 -translate-y-1/4 scroll-indicator"
          >
            <svg
              width="24"
              height="40"
              viewBox="0 0 24 40"
              fill="none"
              className="text-ltx-muted"
            >
              <rect
                x="1"
                y="1"
                width="22"
                height="38"
                rx="11"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <motion.circle
                cx="12"
                cy="12"
                r="3"
                fill="currentColor"
                animate={{ y: [0, 14, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </motion.div>
        </div>

        <motion.div variants={fadeInUp} className="mt-8 flex items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-ltx-studio/30 bg-ltx-studio/5 px-4 py-2 text-sm font-medium text-ltx-studio">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ltx-studio opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ltx-studio" />
            </span>
            Making videos with LTX-2
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
