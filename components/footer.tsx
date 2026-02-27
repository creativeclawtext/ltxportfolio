"use client";

import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Footer() {
  return (
    <footer id="contact" className="py-20 px-6 bg-white">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={fadeInUp} className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-ltx-black">
            Let&apos;s make something.
          </h2>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-8 flex items-center justify-center gap-4 text-sm text-ltx-muted"
        >
          <span>Remote</span>
          <span className="text-ltx-rule">&bull;</span>
          <span>Atlanta</span>
          <span className="text-ltx-rule">&bull;</span>
          <span>Brooklyn</span>
        </motion.div>

        <Separator className="my-12 bg-ltx-rule" />

        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ltx-muted"
        >
          <p>
            Portfolio built with code and{" "}
            <span className="text-ltx-studio font-medium">
              LTX-2
            </span>
          </p>
          <p>James McKay &copy; {new Date().getFullYear()}</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
