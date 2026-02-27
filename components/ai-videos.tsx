"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TiltCard } from "@/components/tilt-card";
import { SectionHeading } from "@/components/section-heading";
import { ProjectModal, cardKeyHandler } from "@/components/project-modal";
import Image from "next/image";
import {
  fadeInUp,
  staggerContainer,
  workflowStep,
} from "@/lib/animations";

/* ── Video project data ── */

interface VideoProject {
  id: string;
  title: string;
  brief: string;
  description: string;
  concept: string;
  prompt: string;
  gradient: string;
  youtubeId?: string;
}

const VIDEO_PROJECTS: VideoProject[] = [
  {
    id: "brief-02",
    title: "Open Source",
    brief: "Brief 02",
    description: "Product explainer — LTX-2 open-source model showcase",
    concept:
      "A product explainer built entirely with LTX-2, showcasing the model's open-source pipeline from text prompt to finished cinematic output. The piece walks through the generation process itself — code dissolving into particles, re-forming as photorealistic landscapes — to demonstrate the breadth of styles and resolutions the model can produce.",
    prompt:
      'ltx-2 generate: "Lines of code dissolving into particles that reform as a cinematic landscape, dark background, neon syntax highlighting morphing to natural color" --style tech --aspect 16:9',
    gradient: "from-ltx-green/60 via-ltx-sky to-ltx-violet",
    youtubeId: "r2dnKbrJhLY",
  },
  {
    id: "brief-12",
    title: "Style",
    brief: "Brief 12",
    description: "Multi-format showcase — one concept, five platform cuts",
    concept:
      "A multi-format showcase proving that one strong creative concept can travel across every major platform. The same scene is re-framed, re-paced, and re-graded for TikTok, Instagram, YouTube, LinkedIn, and broadcast — each cut optimized for its platform's native aspect ratio and audience behaviour.",
    prompt:
      'ltx-2 generate: "Split-screen mosaic of the same scene rendered in five different aspect ratios and color grades, smooth transition between formats" --style editorial --aspect 9:16',
    gradient: "from-ltx-violet via-ltx-pink to-ltx-sky",
    youtubeId: "9ulvcEcaNbE",
  },
  {
    id: "brief-07",
    title: "Monday Morning",
    brief: "Brief 07",
    description: "Workplace spec ad — coffee, chaos, and quiet wins",
    concept:
      "A spec ad that captures the familiar chaos of a Monday morning — the alarm, the commute, the first coffee — then finds the quiet momentum that follows. Shot in a warm, cinematic grade with shallow depth-of-field and deliberate pacing, the piece turns an ordinary workplace ritual into something worth watching.",
    prompt:
      'ltx-2 generate: "A slow push-in on a steaming coffee cup on a cluttered desk at golden hour, shallow depth of field, warm color grade, cinematic 24fps" --style cinematic --aspect 9:16',
    gradient: "from-ltx-pink via-ltx-lavender to-ltx-sky",
    youtubeId: "ml9eNLl6iOQ",
  },
];

/* ── Animated SVG icons for workflow steps ── */

function ConceptIcon({ animate }: { animate: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <motion.path
        d="M14 3C9.03 3 5 7.03 5 12c0 3.3 1.8 6.18 4.5 7.72V22a1 1 0 001 1h7a1 1 0 001-1v-2.28C21.2 18.18 23 15.3 23 12c0-4.97-4.03-9-9-9z"
        stroke="var(--ltx-pink)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.line
        x1="11" y1="25" x2="17" y2="25"
        stroke="var(--ltx-pink)"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.4, delay: 1.0 }}
      />
      <motion.circle
        cx="14" cy="12" r="2"
        fill="var(--ltx-pink)"
        initial={{ scale: 0, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.9 }}
      />
    </svg>
  );
}

function ScriptIcon({ animate }: { animate: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <motion.rect
        x="5" y="3" width="18" height="22" rx="2"
        stroke="var(--ltx-violet)"
        strokeWidth="1.8"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.line x1="9" y1="9" x2="19" y2="9" stroke="var(--ltx-violet)" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={animate ? { pathLength: 1 } : undefined} transition={{ duration: 0.3, delay: 0.6 }} />
      <motion.line x1="9" y1="13" x2="17" y2="13" stroke="var(--ltx-violet)" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={animate ? { pathLength: 1 } : undefined} transition={{ duration: 0.3, delay: 0.8 }} />
      <motion.line x1="9" y1="17" x2="15" y2="17" stroke="var(--ltx-violet)" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={animate ? { pathLength: 1 } : undefined} transition={{ duration: 0.3, delay: 1.0 }} />
    </svg>
  );
}

function LtxIcon({ animate }: { animate: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <motion.path
        d="M14 3l2.5 7.5H24l-6 4.5 2.5 7.5L14 18l-6.5 4.5L10 15l-6-4.5h7.5L14 3z"
        stroke="var(--ltx-studio)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.path
        d="M14 3l2.5 7.5H24l-6 4.5 2.5 7.5L14 18l-6.5 4.5L10 15l-6-4.5h7.5L14 3z"
        fill="var(--ltx-studio)"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 0.15 } : undefined}
        transition={{ duration: 0.5, delay: 1.0 }}
      />
    </svg>
  );
}

function EditIcon({ animate }: { animate: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <motion.rect
        x="3" y="5" width="22" height="16" rx="2"
        stroke="var(--ltx-sky)"
        strokeWidth="1.8"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.line x1="3" y1="9" x2="25" y2="9" stroke="var(--ltx-sky)" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={animate ? { pathLength: 1 } : undefined} transition={{ duration: 0.4, delay: 0.7 }} />
      <motion.path
        d="M12 13l5 3-5 3v-6z"
        fill="var(--ltx-sky)"
        initial={{ scale: 0, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.3, delay: 1.0 }}
      />
      <motion.line x1="6" y1="24" x2="22" y2="24" stroke="var(--ltx-sky)" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={animate ? { pathLength: 1 } : undefined} transition={{ duration: 0.6, delay: 0.8 }} />
    </svg>
  );
}

function DeliverIcon({ animate }: { animate: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <motion.path
        d="M14 24V6"
        stroke="var(--ltx-green)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.path
        d="M8 12l6-6 6 6"
        stroke="var(--ltx-green)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.4, delay: 0.4 }}
      />
      <motion.rect
        x="5" y="24" width="18" height="2" rx="1"
        fill="var(--ltx-green)"
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.8 }}
      />
    </svg>
  );
}

function AgenticSkillsIcon({ animate }: { animate: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <motion.circle
        cx="14" cy="14" r="5"
        stroke="var(--ltx-hot-pink)"
        strokeWidth="1.8"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.circle cx="14" cy="4" r="2" stroke="var(--ltx-hot-pink)" strokeWidth="1.3"
        initial={{ pathLength: 0, opacity: 0 }} animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.4, delay: 0.5 }} />
      <motion.circle cx="23" cy="19" r="2" stroke="var(--ltx-hot-pink)" strokeWidth="1.3"
        initial={{ pathLength: 0, opacity: 0 }} animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.4, delay: 0.7 }} />
      <motion.circle cx="5" cy="19" r="2" stroke="var(--ltx-hot-pink)" strokeWidth="1.3"
        initial={{ pathLength: 0, opacity: 0 }} animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.4, delay: 0.9 }} />
      <motion.line x1="14" y1="9" x2="14" y2="6" stroke="var(--ltx-hot-pink)" strokeWidth="1.2"
        initial={{ pathLength: 0 }} animate={animate ? { pathLength: 1 } : undefined} transition={{ duration: 0.3, delay: 0.6 }} />
      <motion.line x1="18.3" y1="16.5" x2="21.3" y2="18" stroke="var(--ltx-hot-pink)" strokeWidth="1.2"
        initial={{ pathLength: 0 }} animate={animate ? { pathLength: 1 } : undefined} transition={{ duration: 0.3, delay: 0.8 }} />
      <motion.line x1="9.7" y1="16.5" x2="6.7" y2="18" stroke="var(--ltx-hot-pink)" strokeWidth="1.2"
        initial={{ pathLength: 0 }} animate={animate ? { pathLength: 1 } : undefined} transition={{ duration: 0.3, delay: 1.0 }} />
      <motion.circle
        cx="14" cy="14" r="2"
        fill="var(--ltx-hot-pink)"
        initial={{ scale: 0, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.3, delay: 1.1 }}
      />
    </svg>
  );
}

function RemotionAgentIcon({ animate }: { animate: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <motion.rect
        x="4" y="3" width="20" height="22" rx="2"
        stroke="var(--ltx-violet)"
        strokeWidth="1.8"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      {[6, 11, 16, 21].map((y) => (
        <motion.rect key={`l-${y}`} x="5" y={y} width="3" height="2" rx="0.5" fill="var(--ltx-violet)"
          initial={{ opacity: 0 }} animate={animate ? { opacity: 0.5 } : undefined} transition={{ delay: 0.6 + (y - 6) * 0.02 }} />
      ))}
      {[6, 11, 16, 21].map((y) => (
        <motion.rect key={`r-${y}`} x="20" y={y} width="3" height="2" rx="0.5" fill="var(--ltx-violet)"
          initial={{ opacity: 0 }} animate={animate ? { opacity: 0.5 } : undefined} transition={{ delay: 0.6 + (y - 6) * 0.02 }} />
      ))}
      <motion.path
        d="M11 10l-2 4 2 4"
        stroke="var(--ltx-violet)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.5, delay: 0.9 }}
      />
      <motion.path
        d="M17 10l2 4-2 4"
        stroke="var(--ltx-violet)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.5, delay: 1.0 }}
      />
    </svg>
  );
}

function SpeechAgentIcon({ animate }: { animate: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {[
        { x: 5, h: 8, delay: 0.3 },
        { x: 8.5, h: 14, delay: 0.4 },
        { x: 12, h: 18, delay: 0.5 },
        { x: 15.5, h: 14, delay: 0.6 },
        { x: 19, h: 10, delay: 0.7 },
        { x: 22.5, h: 6, delay: 0.8 },
      ].map(({ x, h, delay }) => (
        <motion.rect
          key={x}
          x={x}
          y={14 - h / 2}
          width="2"
          height={h}
          rx="1"
          fill="var(--ltx-violet)"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={animate ? { scaleY: 1, opacity: 0.8 } : undefined}
          transition={{ duration: 0.4, delay, ease: "easeOut" }}
          style={{ transformOrigin: `${x + 1}px 14px` }}
        />
      ))}
      <motion.path
        d="M14 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3z"
        stroke="var(--ltx-violet)"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.5 } : undefined}
        transition={{ duration: 0.8, delay: 0.9 }}
      />
      <motion.path
        d="M8 10v1a6 6 0 0012 0v-1M14 17v4M11 21h6"
        stroke="var(--ltx-violet)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.5 } : undefined}
        transition={{ duration: 0.6, delay: 1.1 }}
      />
    </svg>
  );
}

type IconComponent = React.FC<{ animate: boolean }>;

const WORKFLOW_STEPS: { label: string; Icon: IconComponent }[] = [
  { label: "Concept", Icon: ConceptIcon },
  { label: "Agentic Skills", Icon: AgenticSkillsIcon },
  { label: "Script", Icon: ScriptIcon },
  { label: "LTX-2", Icon: LtxIcon },
  { label: "Remotion Agent", Icon: RemotionAgentIcon },
  { label: "Speech Agent", Icon: SpeechAgentIcon },
  { label: "Polish", Icon: EditIcon },
  { label: "Deliver", Icon: DeliverIcon },
];

/* ── Main Section ── */

export function AiVideos() {
  const [activeProject, setActiveProject] = useState<VideoProject | null>(null);
  const closeModal = useCallback(() => setActiveProject(null), []);

  const workflowRef = useRef<HTMLDivElement>(null);
  const workflowInView = useInView(workflowRef, { once: true, margin: "-50px" });

  return (
    <>
      <section id="ai-video" className="py-24 px-6 bg-ltx-alt">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <SectionHeading title="AI Video" className="mb-4" />
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-lg text-ltx-muted">
                Generated with Lightricks LTX-2. Concept through delivery.
              </p>
              <Badge className="bg-ltx-studio text-white border-none text-xs font-semibold px-3 py-1.5 shrink-0">
                Created with LTX-2
              </Badge>
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {VIDEO_PROJECTS.map((project) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <TiltCard>
                  <Card
                    className="card-glow overflow-hidden border-ltx-rule group cursor-pointer h-full flex flex-col"
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveProject(project)}
                    onKeyDown={cardKeyHandler(() => setActiveProject(project))}
                  >
                    <div
                      className={`aspect-video w-full relative overflow-hidden shrink-0 ${project.youtubeId ? "bg-black" : `bg-gradient-to-br ${project.gradient}`}`}
                    >
                      {project.youtubeId && (
                        <Image
                          src={`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          unoptimized
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          <svg width="18" height="20" viewBox="0 0 20 22" fill="none" className="ml-0.5">
                            <path
                              d="M18.5 9.268a2 2 0 010 3.464L3.5 21.124A2 2 0 010 19.392V2.608A2 2 0 013.5.876L18.5 9.268z"
                              fill="var(--ltx-black)"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-5 flex flex-col flex-1">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ltx-black leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-sm text-ltx-muted mt-2 leading-relaxed flex-1">
                        {project.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ltx-studio">
                          View details
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.5 6h7M6.5 3l3 3-3 3" />
                          </svg>
                        </span>
                        <span className="text-[10px] font-mono font-medium text-ltx-muted bg-ltx-alt rounded px-2 py-0.5">
                          {project.brief}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Workflow Pipeline */}
          <motion.div
            ref={workflowRef}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-20"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-medium tracking-widest uppercase text-ltx-muted mb-8 text-center"
            >
              Production Workflow
            </motion.p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
              {WORKFLOW_STEPS.map((step, i) => (
                <motion.div
                  key={step.label}
                  variants={workflowStep}
                  className="flex items-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-ltx-rule flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
                      <step.Icon animate={workflowInView} />
                    </div>
                    <span className="text-xs font-medium text-ltx-body">
                      {step.label}
                    </span>
                  </div>

                  {i < WORKFLOW_STEPS.length - 1 && (
                    <div className="hidden md:block w-8 lg:w-10 h-px bg-gradient-to-r from-ltx-rule to-ltx-pink/40 mx-1 lg:mx-2" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal overlay */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal onClose={closeModal} ariaLabel={activeProject.title}>
            {activeProject.youtubeId ? (
              <div className="w-full aspect-video rounded-t-2xl overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeProject.youtubeId}?rel=0&modestbranding=1&vq=hd1080`}
                  title={activeProject.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className={`w-full aspect-video bg-gradient-to-br ${activeProject.gradient} relative rounded-t-2xl overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                    <svg width="28" height="32" viewBox="0 0 20 22" fill="none" className="ml-1.5">
                      <path
                        d="M18.5 9.268a2 2 0 010 3.464L3.5 21.124A2 2 0 010 19.392V2.608A2 2 0 013.5.876L18.5 9.268z"
                        fill="var(--ltx-black)"
                      />
                    </svg>
                  </div>
                </div>
                <span className="absolute top-4 left-4 text-xs font-mono font-medium text-white/80 bg-black/30 rounded-md px-3 py-1 backdrop-blur-sm">
                  {activeProject.brief}
                </span>
                <Badge className="absolute top-4 right-14 bg-ltx-studio text-white border-none text-[10px] font-semibold px-2 py-0.5">
                  LTX-2
                </Badge>
              </div>
            )}

            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ltx-black">
                  {activeProject.title}
                </h3>
                <p className="text-ltx-muted mt-1">{activeProject.description}</p>
              </div>

              <div className="h-px bg-ltx-rule" />

              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-2">
                  Concept
                </h4>
                <p className="text-sm text-ltx-body leading-relaxed">
                  {activeProject.concept}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-2">
                  Sample LTX Prompt
                </h4>
                <div className="bg-ltx-alt border border-ltx-rule rounded-lg p-4 font-mono text-sm text-ltx-body leading-relaxed whitespace-pre-wrap break-words">
                  {activeProject.prompt}
                </div>
              </div>
            </div>
          </ProjectModal>
        )}
      </AnimatePresence>
    </>
  );
}
