"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Clock,
  Cpu,
  Target,
  ChevronRight,
  ChevronLeft,
  Layout,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useState } from "react";
import type { Project } from "@/lib/project-data";

interface CaseStudyContentProps {
  project: Project;
}

export function CaseStudyContent({ project }: CaseStudyContentProps) {
  const router = useRouter();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % project.media.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + project.media.length) % project.media.length);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#2551AF] font-bold mb-12 hover:gap-3 transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </button>

          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2551AF]/10 text-[#2551AF] text-xs font-black mb-6 uppercase tracking-widest"
              >
                <Layout className="w-4 h-4" />
                <span>{project.category} Case Study</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-7xl font-black text-[#2551AF] mb-8 tracking-tighter"
              >
                {project.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl sm:text-2xl text-[#2551AF]/80 leading-relaxed font-medium max-w-4xl"
              >
                {project.fullDescription}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative aspect-video w-full rounded-[3.5rem] overflow-hidden shadow-xl shadow-[rgba(37,81,175,0.1)] bg-[#2551AF]/5 mb-20 border border-[#2551AF]/20"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMediaIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {project.media[currentMediaIndex]?.type === "video" ? (
                    <video
                      src={project.media[currentMediaIndex].url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={project.media[currentMediaIndex]?.url ?? project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {project.media.length > 1 && (
                <>
                  <div className="absolute inset-y-0 left-6 flex items-center z-20">
                    <button
                      onClick={prevMedia}
                      className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-[#2551AF] hover:bg-white transition-all border border-white/20 shadow-lg group"
                    >
                      <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-6 flex items-center z-20">
                    <button
                      onClick={nextMedia}
                      className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-[#2551AF] hover:bg-white transition-all border border-white/20 shadow-lg group"
                    >
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {project.media.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentMediaIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentMediaIndex ? "w-10 bg-[#2551AF]" : "w-2 bg-[#2551AF]/40"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              <div className="lg:w-2/3 space-y-20">
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#2551AF]/10 flex items-center justify-center text-[#2551AF]">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-black text-[#2551AF] tracking-tight">Key Features</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {project.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 5 }}
                        className="flex items-start gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100 group"
                      >
                        <CheckCircle2 className="w-6 h-6 text-[#2551AF] mt-0.5 transition-transform group-hover:scale-110" />
                        <span className="text-lg text-[#2551AF] font-bold leading-tight">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#2551AF]/10 flex items-center justify-center text-[#2551AF]">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-black text-[#2551AF] tracking-tight">Success Results</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {project.results.map((result, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-6 rounded-3xl border-2 border-[#2551AF]/10 shadow-sm"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#2551AF]" />
                        <span className="text-lg text-[#2551AF]/80 font-bold">{result}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="lg:w-1/3">
                <div className="sticky top-32 space-y-8">
                  <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-[#2551AF]/20 shadow-lg">
                    <div className="space-y-10">
                      <div>
                        <h4 className="text-[#2551AF]/40 text-xs font-black uppercase tracking-[0.2em] mb-3">
                          Client
                        </h4>
                        <p className="text-2xl font-black text-[#2551AF] tracking-tight">
                          {project.client ?? "—"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-[#2551AF]/40 text-xs font-black uppercase tracking-[0.2em] mb-3">
                          Timeline
                        </h4>
                        <div className="flex items-center gap-2 text-2xl font-black text-[#2551AF] tracking-tight">
                          <Clock className="w-6 h-6" />
                          <span>{project.duration}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[#2551AF]/40 text-xs font-black uppercase tracking-[0.2em] mb-3">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="px-4 py-2 bg-white rounded-xl text-xs font-black text-[#2551AF] border border-[#2551AF]/10 shadow-sm"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-12">
                      <a
                        href={project.liveLink ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-5 bg-[#2551AF] text-white rounded-3xl font-black text-center shadow-xl hover:bg-white hover:text-[#2551AF] hover:border-2 hover:border-[#2551AF] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
                      >
                        Launch Project
                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    </div>
                  </div>

                  <div className="bg-[#2551AF] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700" />
                    <Cpu className="w-12 h-12 mb-6 opacity-50" />
                    <h4 className="text-2xl font-black mb-4 tracking-tight">Built for Scale</h4>
                    <p className="text-white/80 font-medium leading-relaxed mb-8">
                      Leveraging modern architectural patterns to ensure high performance and zero downtime.
                    </p>
                    <Link href="#contact" className="inline-flex items-center gap-2 font-black group/link">
                      <span>Inquire for similar tech</span>
                      <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
