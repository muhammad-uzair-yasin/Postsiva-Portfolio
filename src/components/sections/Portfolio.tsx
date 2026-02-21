"use client";

import { motion } from "framer-motion";
import { Sparkles, Github, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/project-data";

interface PortfolioProps {
  projects: Project[];
  /** When true, used on /portfolio page: "All Projects" title and no "Show More" button */
  fullPage?: boolean;
}

export const Portfolio = ({ projects, fullPage }: PortfolioProps) => {
  return (
    <section
      id="portfolio"
      className="py-24 sm:py-32 bg-transparent relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2551AF]/10 border border-[#2551AF]/20 text-[#2551AF] text-xs font-black mb-6 tracking-widest uppercase"
          >
            <Sparkles className="w-4 h-4" />
            <span>{fullPage ? "All Projects" : "Our Success Stories"}</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-[#2551AF] mb-6 tracking-tighter">
            {fullPage ? (
              <>All <span className="text-[#5073be]">Projects</span></>
            ) : (
              <>Our Latest <span className="text-[#5073be]">Portfolio</span></>
            )}
          </h2>
          <p className="text-xl text-[#2551AF] max-w-2xl mx-auto font-medium">
            Explore our diverse portfolio of projects where we&apos;ve delivered
            technical excellence and real business impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-[#2551AF]/20 shadow-xl shadow-[rgba(37,81,175,0.1)] hover:shadow-2xl hover:shadow-[rgba(37,81,175,0.12)] transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative aspect-16/10 overflow-hidden block">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider text-[#2551AF] border border-[#2551AF]/10">
                    {project.category}
                  </div>
                  {project.featured && (
                    <div className="px-4 py-2 bg-[#2551AF] text-white rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col grow">
                <h3 className="text-2xl font-black text-[#2551AF] mb-3 group-hover:text-[#1a3a8a] transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-[#2551AF]/70 font-medium line-clamp-2 mb-6 leading-relaxed grow">
                  {project.description}
                </p>

                {(project.githubLink || project.liveLink) && (
                  <div className="flex items-center gap-3 mt-auto">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-[#2551AF]/80 hover:text-[#2551AF] transition-colors"
                        aria-label="GitHub repository"
                      >
                        <Github className="w-5 h-5" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-[#2551AF]/80 hover:text-[#2551AF] transition-colors"
                        aria-label="Live demo"
                      >
                        <Globe className="w-5 h-5" />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {!fullPage && (
          <div className="mt-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 28px 0 rgba(37,81,175,0.1)",
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                href="/portfolio"
                className="px-10 py-4 bg-primary text-[#fff] font-black rounded-2xl hover:bg-primary/80 hover:text-white transition-all shadow-md relative overflow-hidden group focus:outline-none"
              >
                <span className="relative z-10">Show More Projects</span>
                {/* Animated Shine Effect */}
                <span className="absolute left-[-60%] top-0 h-full w-1/3 rotate-12 bg-white/30 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:left-[110%] z-0"></span>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
