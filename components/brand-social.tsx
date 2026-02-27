"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TiltCard } from "@/components/tilt-card";
import { SectionHeading } from "@/components/section-heading";
import { ProjectModal, cardKeyHandler } from "@/components/project-modal";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";

/* ── Data ── */

interface Video {
  title: string;
  role: string;
  thumb: string;
  url: string;
}

interface Category {
  name: string;
  description: string;
  cover: string;
  videos: Video[];
}

const CATEGORIES: Category[] = [
  {
    name: "Pharma",
    description: "Healthcare social campaigns for major pharmaceutical brands.",
    cover: "/brand/timessquare.jpg",
    videos: [
      {
        title: "Adam Schefter",
        role: "Producer — Healthcare Social",
        thumb: "/brand/n-jdOfgDIT4.jpg",
        url: "https://www.youtube.com/shorts/n-jdOfgDIT4",
      },
      {
        title: "Times Square Event",
        role: "Producer — Healthcare Social",
        thumb: "/brand/timessquare.jpg",
        url: "https://www.instagram.com/reel/C5HB-vQLTOl/",
      },
    ],
  },
  {
    name: "Motion Graphics",
    description: "Data-driven animation and infographic storytelling.",
    cover: "/brand/oivwH78C_AA.jpg",
    videos: [
      {
        title: "Bloomberg American Health Initiative",
        role: "Producer",
        thumb: "/brand/oivwH78C_AA.jpg",
        url: "https://www.youtube.com/watch?v=oivwH78C_AA",
      },
    ],
  },
  {
    name: "Doc Style",
    description: "Short-form documentary across 6 continents.",
    cover: "/brand/ao2GKykYhy4.jpg",
    videos: [
      {
        title: "Road Safety Awards",
        role: "Producer",
        thumb: "/brand/B2lqFVv3NPE.jpg",
        url: "https://www.youtube.com/watch?v=B2lqFVv3NPE",
      },
      {
        title: "Argentina",
        role: "Producer",
        thumb: "/brand/ao2GKykYhy4.jpg",
        url: "https://youtu.be/ao2GKykYhy4",
      },
      {
        title: "Bogota",
        role: "Producer",
        thumb: "/brand/DiDoLazzyEw.jpg",
        url: "https://youtu.be/DiDoLazzyEw",
      },
      {
        title: "Pleiku City",
        role: "Producer",
        thumb: "/brand/MJMzk_56FCM.jpg",
        url: "https://youtu.be/MJMzk_56FCM",
      },
      {
        title: "Tunisia",
        role: "Producer",
        thumb: "/brand/_x3FqKZlEjQ.jpg",
        url: "https://youtu.be/_x3FqKZlEjQ",
      },
    ],
  },
  {
    name: "Healthcare",
    description: "Patient stories and medical research narratives for FNIH.",
    cover: "/brand/vjeR6JnL-dw.jpg",
    videos: [
      {
        title: "FNIH — ALS",
        role: "Producer",
        thumb: "/brand/vjeR6JnL-dw.jpg",
        url: "https://www.youtube.com/watch?v=vjeR6JnL-dw",
      },
      {
        title: "FNIH Lurie Prize",
        role: "Producer",
        thumb: "/brand/cnmHw1AFYSc.jpg",
        url: "https://www.youtube.com/watch?v=cnmHw1AFYSc",
      },
      {
        title: "FNIH — Deeda Blair",
        role: "Producer",
        thumb: "/brand/WnXvtt5s_zQ.jpg",
        url: "https://www.youtube.com/watch?v=WnXvtt5s_zQ",
      },
    ],
  },
];

/* ── Main Section ── */

export function BrandSocial() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const closeModal = useCallback(() => setActiveCategory(null), []);

  return (
    <>
      <section id="brand-social" className="py-16 md:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Brand & Social"
            subtitle="Pharma, motion graphics, documentary, and healthcare — produced across platforms and continents."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.name} variants={fadeInUp}>
                <TiltCard>
                  <Card
                    className="card-glow overflow-hidden border-ltx-rule group cursor-pointer h-full flex flex-col"
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveCategory(cat)}
                    onKeyDown={cardKeyHandler(() => setActiveCategory(cat))}
                  >
                    <div className="aspect-video w-full relative overflow-hidden bg-ltx-alt shrink-0">
                      <Image
                        src={cat.cover}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>

                    <CardContent className="p-4 flex flex-col flex-1">
                      <h3 className="font-[family-name:var(--font-display)] font-semibold text-ltx-black leading-snug">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-ltx-muted mt-1.5 leading-snug flex-1">
                        {cat.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ltx-pink">
                          View work
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.5 6h7M6.5 3l3 3-3 3" />
                          </svg>
                        </span>
                        <Badge className="text-ltx-muted bg-ltx-alt text-[10px] font-medium border-0">
                          {cat.videos.length === 1
                            ? "1 piece"
                            : `${cat.videos.length} pieces`}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeCategory && (
          <ProjectModal onClose={closeModal} ariaLabel={activeCategory.name}>
            <div className="relative w-full aspect-[21/9] rounded-t-2xl overflow-hidden bg-ltx-alt">
              <Image
                src={activeCategory.cover}
                alt={activeCategory.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white">
                  {activeCategory.name}
                </h3>
                <p className="text-white/70 text-sm mt-1 max-w-md">
                  {activeCategory.description}
                </p>
              </div>
            </div>

            <div className="p-5 md:p-8">
              <div className="space-y-3">
                {activeCategory.videos.map((video) => (
                  <a
                    key={video.url}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-4 rounded-xl border border-ltx-rule bg-ltx-alt/40 p-3 hover:border-ltx-pink/40 hover:bg-ltx-alt transition-all duration-200"
                  >
                    <div className="relative w-28 sm:w-36 shrink-0 aspect-video rounded-lg overflow-hidden bg-ltx-alt">
                      <Image
                        src={video.thumb}
                        alt={video.title}
                        fill
                        className="object-cover group-hover/link:scale-105 transition-transform duration-300"
                        sizes="144px"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/link:opacity-100 transition-opacity bg-black/30">
                        <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="ml-0.5">
                            <path
                              d="M9 4.268a2 2 0 010 3.464L3 10.66A2 2 0 010 8.928V3.072A2 2 0 013 1.34L9 4.268z"
                              fill="var(--ltx-black)"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-ltx-black leading-snug truncate">
                        {video.title}
                      </h4>
                      <p className="text-xs text-ltx-muted mt-0.5">
                        {video.role}
                      </p>
                    </div>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="shrink-0 text-ltx-muted group-hover/link:text-ltx-pink transition-colors"
                    >
                      <path
                        d="M4 12L12 4M12 4H5.5M12 4V10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </ProjectModal>
        )}
      </AnimatePresence>
    </>
  );
}
