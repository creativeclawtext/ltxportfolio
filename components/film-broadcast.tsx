"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { ProjectModal, cardKeyHandler } from "@/components/project-modal";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";

/* ── Data ── */

const FLEXJET = {
  title: "Flight Command Center Experience",
  description:
    "Immersive multi-screen gaming experience for luxury client tours. Custom sound design, 360-degree visuals, and interactive fleet management.",
  thumb: "/brand/flexjet-map-thumb.jpg",
  frames: [
    "/brand/flexjet-og.jpg",
    "/brand/flexjet.jpg",
    "/brand/flexjet-fleet.jpg",
    "/brand/flexjet-map.jpg",
  ],
  details: [
    { label: "Role", value: "Creative Technologist / Producer" },
    {
      label: "Scope",
      value:
        "Multi-screen integration across command center wall-to-wall displays",
    },
    {
      label: "Experience",
      value:
        "Logic-based gaming that puts prospective clients in the role of fleet managers",
    },
    {
      label: "Audio",
      value: "Spatial, dynamic sound design maximizing auditorium acoustics",
    },
  ],
};

const REEL = {
  title: "Production Reel",
  description:
    "20 years of production craft. Selected work across brand campaigns, documentary, broadcast, and narrative film.",
  youtubeId: "vDAeQt0vmxY",
  thumb: "/reel/thumb-v2.jpg",
  frames: [
    "/reel/frame-01.jpg",
    "/reel/frame-02.jpg",
    "/reel/frame-03.jpg",
    "/reel/frame-04.jpg",
  ],
};

const CREDITS = [
  {
    title: "netuser",
    role: "Writer / Director / Editor",
    detail:
      "Feature film starring Denis O'Hare. Best Film — LGBT Los Angeles Film Festival.",
  },
  {
    title: 'The CW — "Would I Lie To You?"',
    role: "Production Manager",
    detail:
      "13 episodes. 45-person crew. 6.5 hours of broadcast television in 10 days.",
  },
  {
    title: 'Travel Channel — "Ripley\'s Believe It or Not!"',
    role: "Production Supervisor",
    detail:
      "25+ cities across 6 continents. 100+ person distributed team. 60+ segments.",
  },
  {
    title: "IBM Cybersecurity Campaign",
    role: "Director / Producer",
    detail:
      "Branded documentary content. Security clearances. Nationwide activation.",
  },
];

const CLIENTS = [
  "IBM",
  "Adidas",
  "JP Morgan Chase",
  "Travel Channel",
  "Discovery",
  "The CW",
  "Viceland / A&E",
  "MTV",
  "National Geographic",
  "SyFy",
  "Food Network",
  "Animal Planet",
  "Walt Disney Pictures",
  "Warner Bros.",
];

type ModalType = "reel" | "flexjet" | null;

/* ── Main Section ── */

export function FilmBroadcast() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = useCallback(() => setActiveModal(null), []);

  return (
    <>
      <section
        id="film"
        className="bg-white py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden"
      >
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading title="Film, Broadcast, & Interactive" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20"
          >
            {/* Reel Card */}
            <motion.div variants={fadeInUp}>
              <Card
                className="card-glow overflow-hidden border-ltx-rule group cursor-pointer hover:border-ltx-pink/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(243,125,217,0.15)] h-full flex flex-col"
                role="button"
                tabIndex={0}
                onClick={() => setActiveModal("reel")}
                onKeyDown={cardKeyHandler(() => setActiveModal("reel"))}
              >
                <div className="aspect-video w-full relative overflow-hidden bg-ltx-alt shrink-0">
                  <Image
                    src={REEL.thumb}
                    alt="Production Reel thumbnail"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 20 22"
                        fill="none"
                        className="ml-0.5"
                      >
                        <path
                          d="M18.5 9.268a2 2 0 010 3.464L3.5 21.124A2 2 0 010 19.392V2.608A2 2 0 013.5.876L18.5 9.268z"
                          fill="var(--ltx-black)"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-ltx-black">
                    {REEL.title}
                  </h3>
                  <p className="text-sm text-ltx-muted mt-1.5 leading-snug flex-1">
                    {REEL.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ltx-pink">
                      Watch reel
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 6h7M6.5 3l3 3-3 3" />
                      </svg>
                    </span>
                    <Badge className="text-ltx-muted bg-ltx-alt text-[10px] font-mono font-medium border-0">
                      Reel
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Flexjet Interactive Card */}
            <motion.div variants={fadeInUp}>
              <Card
                className="card-glow overflow-hidden border-ltx-rule group cursor-pointer hover:border-ltx-pink/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(243,125,217,0.15)] h-full flex flex-col"
                role="button"
                tabIndex={0}
                onClick={() => setActiveModal("flexjet")}
                onKeyDown={cardKeyHandler(() => setActiveModal("flexjet"))}
              >
                <div className="aspect-video w-full relative overflow-hidden bg-ltx-alt shrink-0">
                  <Image
                    src={FLEXJET.thumb}
                    alt="Command Center Interactive Experience"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-ltx-black">
                    {FLEXJET.title}
                  </h3>
                  <p className="text-sm text-ltx-muted mt-1.5 leading-snug flex-1">
                    {FLEXJET.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ltx-pink">
                      View project
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 6h7M6.5 3l3 3-3 3" />
                      </svg>
                    </span>
                    <Badge className="text-ltx-muted bg-ltx-alt text-[10px] font-mono font-medium border-0">
                      Interactive
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Client Marquee */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-ltx-muted mb-6 text-center">
              Notable Clients & Networks
            </p>
            <div className="overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

              <div className="marquee-track">
                {[...CLIENTS, ...CLIENTS].map((client, i) => (
                  <span
                    key={`${client}-${i}`}
                    className="inline-flex items-center text-sm font-medium text-ltx-muted whitespace-nowrap px-8 py-2 hover:text-ltx-black transition-colors duration-200"
                  >
                    {client}
                    <span className="ml-8 text-ltx-rule">&bull;</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeModal === "reel" && (
          <ProjectModal onClose={closeModal} ariaLabel={REEL.title}>
            <div className="w-full aspect-video rounded-t-2xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${REEL.youtubeId}?rel=0&modestbranding=1&vq=hd1080`}
                title="Production Reel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ltx-black">
                  {REEL.title}
                </h3>
                <p className="text-ltx-muted mt-1">{REEL.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-3">
                  Frames
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {REEL.frames.map((frame, i) => (
                    <div
                      key={i}
                      className="aspect-video rounded-lg overflow-hidden bg-ltx-alt relative"
                    >
                      <Image
                        src={frame}
                        alt={`Reel frame ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 160px"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-ltx-rule" />

              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-5">
                  Selected Credits
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {CREDITS.map((credit) => (
                    <div
                      key={credit.title}
                      className="rounded-xl border border-ltx-rule bg-ltx-alt/50 p-4 space-y-1.5"
                    >
                      <h5 className="text-sm font-bold text-ltx-black leading-snug">
                        {credit.title}
                      </h5>
                      <p className="text-xs font-semibold text-ltx-pink">
                        {credit.role}
                      </p>
                      <p className="text-xs text-ltx-muted leading-relaxed">
                        {credit.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ProjectModal>
        )}

        {activeModal === "flexjet" && (
          <ProjectModal onClose={closeModal} ariaLabel={FLEXJET.title}>
            <div className="w-full aspect-video rounded-t-2xl overflow-hidden bg-black relative">
              <Image
                src="/brand/flexjet-og.jpg"
                alt="Command Center Experience"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ltx-black">
                  {FLEXJET.title}
                </h3>
                <p className="text-ltx-muted mt-1">{FLEXJET.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-3">
                  Screens
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {FLEXJET.frames.map((frame, i) => (
                    <div
                      key={i}
                      className="aspect-video rounded-lg overflow-hidden bg-ltx-alt relative"
                    >
                      <Image
                        src={frame}
                        alt={`Screen ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 160px"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-ltx-rule" />

              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-5">
                  Project Details
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {FLEXJET.details.map((detail) => (
                    <div
                      key={detail.label}
                      className="rounded-xl border border-ltx-rule bg-ltx-alt/50 p-4 space-y-1.5"
                    >
                      <p className="text-xs font-semibold text-ltx-pink">
                        {detail.label}
                      </p>
                      <p className="text-sm text-ltx-black leading-relaxed">
                        {detail.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ProjectModal>
        )}
      </AnimatePresence>
    </>
  );
}
