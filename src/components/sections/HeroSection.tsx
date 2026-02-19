"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles, Code2, Rocket, Layout, Smartphone, Database, Workflow, ServerIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import RippleGrid from "../ui/RippleGrid";
import LogoLoop from "../ui/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiPrisma,
  SiShadcnui,
  SiTrpc
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiFramer />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiPrisma />, title: "Prisma", href: "https://www.prisma.io" },
  { node: <SiShadcnui />, title: "Shadcn UI", href: "https://ui.shadcn.com" },
  { node: <SiTrpc />, title: "tRPC", href: "https://trpc.io" },
];

const Particle = ({ delay, duration, left }: { delay: number; duration: number; left: string }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: "100vh", opacity: [0, 1, 1, 0] }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
    style={{ left }}
    className="absolute top-0 w-1.5 h-1.5 bg-[#2551AF]/40 rounded-full blur-[1px]"
  />
);

export default function HeroSection() {
  const [particles, setParticles] = useState<{ id: number; left: string; delay: number; duration: number }[]>([]);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  // const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 15,
      }))
    );
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24">
      {/* Background Ripple Grid – primary #2551AF, matches site */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <RippleGrid
          enableRainbow={false}
          rippleIntensity={0.08}
          gridSize={30}
          gridThickness={25}
          mouseInteraction={true}
          mouseInteractionRadius={1.8}
          opacity={0.5}
          speed={0.1}
        />
      </div>

      {/* Light Sprinkle Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <Particle key={p.id} left={p.left} delay={p.delay} duration={p.duration} />
        ))}
      </div>

      {/* Floating Glow Effects */}
      {/* <motion.div style={{ y: y1 }} className="glow-effect top-1/4 -left-20 w-[600px] h-[600px] bg-[#85868a]" />
      <motion.div style={{ y: y2 }} className="glow-effect bottom-1/4 -right-20 w-[600px] h-[600px] bg-[#85868a]" /> */}

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ opacity, scale }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2551AF]/10 border border-[#2551AF]/20 text-[#2551AF] text-sm font-bold mb-10 shadow-[0_0_30px_rgba(37,81,175,0.12)]"
          >
            <Sparkles className="w-4 h-4 text-[#2551AF] animate-pulse" />
            <span>Building the Future, Today</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[#2551AF] mb-8 leading-[1.1] tracking-tighter"
          >
            Engineering Excellence for <br />
            <span className="text-[#5073be]">
              Modern Digital Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-base md:text-lg text-[#1a3a8a] mb-10 leading-relaxed font-medium"
          >
            At Postsiva Tech, we combine technical excellence with creative innovation
            to deliver software solutions that transform businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link href="#portfolio" className="cursor-pointer">
              <Button size="lg" className="group h-14 px-8 rounded-2xl text-base font-bold cursor-pointer">
                View Our Work
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#contact" className="cursor-pointer">
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl text-base font-bold cursor-pointer">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Visual Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto perspective-1000 mb-20"
        >
          <div className="absolute inset-0 bg-[#2551AF]/15 blur-[120px] rounded-full -z-10 animate-pulse" />

          <div className="bg-white rounded-[3rem] p-4 border border-[#2551AF]/20 shadow-xl shadow-[rgba(37,81,175,0.12)] overflow-hidden group">
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-[#2551AF]/15 shadow-lg relative aspect-16/10">
              <div className="absolute inset-0 bg-[#2551AF]/5 z-10 pointer-events-none" />
              <Image
                src="/hero-section2.png"
                alt="Project Portal Dashboard"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Hero Bottom - Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-10"
        >
          {[
            { label: "React / Next.js", icon: Code2 },
            { label: "Mobile First", icon: Smartphone },
            { label: "Scalable", icon: Rocket },
            { label: "Scraping Data", icon: Database },
            { label: "N8N", icon: Workflow },
            { label: "DevOps", icon: ServerIcon },
            { label: "Modern UI/UX", icon: Layout }

          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 group cursor-default bg-white px-6 py-3 rounded-2xl border border-[#2551AF]/20 shadow-md shadow-[rgba(37,81,175,0.08)]">
              <item.icon className="w-5 h-5 text-[#2551AF] group-hover:scale-110 transition-transform" />
              <span className="font-bold text-[#2551AF] tracking-tight text-sm transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Bottom Logo Loop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 pt-8 "
        >
          <p className="text-base font-extrabold text-[#2551AF] uppercase tracking-[0.2em] mb-10 text-center">
            Powering Innovation with Modern Tech Stack
          </p>
          <LogoLoop
            logos={techLogos}
            speed={35}
            direction="left"
            logoHeight={32}
            gap={64}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            className="text-[#2551AF] transition-colors"
          />
        </motion.div>
      </div>
    </section>
  );
}

