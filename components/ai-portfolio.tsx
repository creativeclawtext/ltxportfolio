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

/* ── Project data ── */

interface ProjectDetail {
  label: string;
  value: string;
}

interface Project {
  key: string;
  title: string;
  description: string;
  thumb: string;
  badge: string;
  url?: string;
  frames: string[];
  details: ProjectDetail[];
  heroBg?: string;
}

const PROJECTS: Project[] = [
  {
    key: "avatars",
    title: "Patient Digital Twins",
    description:
      "AI-powered interactive avatars for a major medical conference — real-time conversations with healthcare professionals.",
    thumb: "/brand/avatars-hero.png",
    badge: "Conference Activation",
    frames: [
      "/brand/avatars-hero.png",
      "/brand/avatars-michael.png",
      "/brand/avatars-anthony.png",
      "/brand/avatars-sandy.png",
    ],
    details: [
      { label: "Role", value: "Creative Technologist / Producer" },
      {
        label: "Experience",
        value:
          "Four interactive AI avatars modeled on real-world patient demographics engaging HCPs in natural conversation",
      },
      {
        label: "Compliance",
        value:
          "Embedded guardrails ensuring all responses were compliant, friendly, and aligned with approved legal language",
      },
      {
        label: "Impact",
        value:
          "First-of-its-kind conference activation — dozens of HCPs and executives engaged in live, real-time dialogue",
      },
    ],
    heroBg: "#1a2e4a",
  },
  {
    key: "ccs",
    title: "Creative Context Studio",
    description:
      "Full-stack portfolio built as a mid-century aerospace technical documentation system. React, Next.js, and thematic UI.",
    thumb: "/brand/ccs-projects.png",
    badge: "Web App",
    url: "https://portfolio.creativecontext.studio",
    frames: [
      "/brand/ccs-home.png",
      "/brand/ccs-projects.png",
      "/brand/ccs-studiolab.png",
    ],
    details: [
      {
        label: "Stack",
        value: "React, Next.js, TypeScript, Tailwind CSS — deployed on Vercel",
      },
      {
        label: "Features",
        value:
          "4 switchable themes, filterable project grid, Studio Lab with experimental mini apps",
      },
      {
        label: "Design System",
        value:
          "Cold War aerospace documentation aesthetic — monospace type, hot pink accents, dashed borders, and retro control panels",
      },
      {
        label: "Content",
        value:
          "18 production & engineering projects spanning video, interactive, AI, XR, and full-stack web",
      },
    ],
    heroBg: "#f4f0e8",
  },
  {
    key: "storyatl",
    title: "storyATL",
    description:
      "A living archive where Atlanta tells its own stories. Interactive map, voice booth, and a RAG-powered chatbot.",
    thumb: "/brand/storyatl-04.png",
    badge: "Web App",
    url: "https://storyatl.creativecontext.studio",
    frames: [
      "/brand/storyatl-01.png",
      "/brand/storyatl-02.png",
      "/brand/storyatl-03.png",
      "/brand/storyatl-04.png",
      "/brand/storyatl-05.png",
    ],
    details: [
      {
        label: "Stack",
        value:
          "React, Next.js, TypeScript, Tailwind CSS — open source on GitHub",
      },
      {
        label: "Features",
        value:
          "10-section interactive exchange, voice recording booth, interactive neighborhood map, RAG chatbot, wikiATL knowledge base",
      },
      {
        label: "Design",
        value:
          "Warm peach palette with conversational UI — each section is a question-and-answer exchange between the visitor and the city",
      },
      {
        label: "Concept",
        value:
          "Community storytelling platform designed for Atlanta — voices, places, and stories connected through interactive cartography",
      },
    ],
    heroBg: "#fdf0e6",
  },
  {
    key: "bartender",
    title: "Bartender Friend",
    description:
      "A pocket reference for bartenders — classic recipes, pro standards, and training drills. Actually useful behind the bar.",
    thumb: "/brand/bartender-home.png",
    badge: "Web App",
    url: "https://bartender-friend.vercel.app/",
    frames: [
      "/brand/bartender-home.png",
      "/brand/bartender-recipes.png",
      "/brand/bartender-recipe.png",
    ],
    details: [
      {
        label: "Stack",
        value: "React, Next.js, TypeScript, Fumadocs — deployed on Vercel",
      },
      {
        label: "Features",
        value:
          "40+ cocktail recipe cards, family explorer, build-step guides, cheat sheet, and training drills",
      },
      {
        label: "Design",
        value:
          "Retro-modern bartender's notebook — bold type, hot pink accents, dashed green borders, and yellow navigation",
      },
      {
        label: "Concept",
        value:
          "Quick-reference companion for working bartenders — searchable specs, pro standards, and speed hacks for building rounds faster",
      },
    ],
    heroBg: "#faf5e4",
  },
];

/* ── Main Section ── */

export function AiPortfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const closeModal = useCallback(() => setActiveProject(null), []);

  return (
    <>
      <section
        id="ai-portfolio"
        className="py-16 md:py-24 px-4 sm:px-6 bg-ltx-alt"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="AI, APIs, and Agentic Systems"
            subtitle="Conversational AI, interactive avatars, and tools that connect generative models to real workflows."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {PROJECTS.map((project) => (
              <motion.div key={project.key} variants={fadeInUp}>
                <TiltCard>
                  <Card
                    className="card-glow overflow-hidden border-ltx-rule group cursor-pointer h-full flex flex-col"
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveProject(project)}
                    onKeyDown={cardKeyHandler(() => setActiveProject(project))}
                  >
                    <div className="aspect-[16/10] w-full relative overflow-hidden bg-ltx-alt shrink-0">
                      <Image
                        src={project.thumb}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>

                    <CardContent className="p-5 flex flex-col flex-1">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ltx-black leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-sm text-ltx-muted mt-2 leading-relaxed flex-1">
                        {project.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
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
                        <Badge className="text-ltx-muted bg-ltx-alt text-[10px] font-medium border-0">
                          {project.badge}
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
        {activeProject && (
          <ProjectModal onClose={closeModal} ariaLabel={activeProject.title}>
            {/* Hero image */}
            <div
              className="w-full aspect-video rounded-t-2xl overflow-hidden relative"
              style={{ backgroundColor: activeProject.heroBg ?? "var(--ltx-bg-alt)" }}
            >
              <Image
                src={activeProject.thumb}
                alt={activeProject.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* Title & description */}
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ltx-black">
                  {activeProject.title}
                </h3>
                <p className="text-ltx-muted mt-1 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Screenshot gallery */}
              {activeProject.frames.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-3">
                    {activeProject.key === "avatars"
                      ? "Digital Twins"
                      : "Screenshots"}
                  </h4>
                  <div
                    className={`grid gap-2 ${
                      activeProject.frames.length <= 3
                        ? "grid-cols-3"
                        : activeProject.frames.length === 5
                          ? "grid-cols-3 sm:grid-cols-5"
                          : "grid-cols-4"
                    }`}
                  >
                    {activeProject.frames.map((frame, i) => (
                      <div
                        key={frame}
                        className="aspect-video rounded-lg overflow-hidden relative"
                        style={{
                          backgroundColor:
                            activeProject.heroBg ?? "var(--ltx-bg-alt)",
                        }}
                      >
                        <Image
                          src={frame}
                          alt={`${activeProject.title} screen ${i + 1}`}
                          fill
                          className="object-cover object-top"
                          sizes="200px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="h-px bg-ltx-rule" />

              {/* Project details */}
              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-5">
                  Project Details
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {activeProject.details.map((detail) => (
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

              {/* Visit site link */}
              {activeProject.url && (
                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ltx-pink px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition"
                >
                  Visit Site
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M1 13L13 1M13 1H4M13 1V10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}
            </div>
          </ProjectModal>
        )}
      </AnimatePresence>
    </>
  );
}
