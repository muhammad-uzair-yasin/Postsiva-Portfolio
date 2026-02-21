"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Workflow, Zap } from "lucide-react";

interface N8nWorkflowsProps {
  /** When true, used on /workflows page: "All Workflows" title and no "Show More" button */
  fullPage?: boolean;
}

const n8nWorkflows = [
  { name: "LinkedIn AI Content Generator", description: "AI-powered LinkedIn post generation with persona and content tuning.", nodes: 49, active: true },
  { name: "Post Generator", description: "Generate and manage social posts with AI, scheduling, and publishing.", nodes: 52, active: true },
  { name: "Social Media Post Creation (Updated)", description: "End-to-end social media post creation with AI and multi-platform support.", nodes: 61, active: true },
  { name: "Calan Newsletter Generator", description: "Automated newsletter generation and distribution with custom links.", nodes: 44, active: true },
  { name: "Calan Newsletter gen", description: "Newsletter content generation and delivery automation.", nodes: 35, active: true },
  { name: "Article Scraper Parent Workflow", description: "Parent workflow for scraping and processing articles at scale.", nodes: 19, active: true },
  { name: "Competitor Analysis", description: "Analyze competitor content and performance with AI insights.", nodes: 33, active: true },
  { name: "Email Delivery with Brevo", description: "Transactional and marketing email delivery via Brevo (Sendinblue).", nodes: 12, active: true },
  { name: "Writing Style Analyzer", description: "Analyze and extract writing style patterns from content.", nodes: 9, active: true },
  { name: "Content Pattern Analyzer", description: "Detect content patterns and themes for strategy and optimization.", nodes: 9, active: true },
  { name: "Topics Keywords Extractor", description: "Extract topics and keywords from text for SEO and content planning.", nodes: 9, active: true },
  { name: "Page Info Analyzer", description: "Analyze page metadata and structure for content and SEO.", nodes: 9, active: true },
  { name: "Emoji Usage Analyzer", description: "Analyze emoji usage and engagement patterns in content.", nodes: 9, active: true },
  { name: "Discription Gen", description: "AI-generated descriptions for videos and social content.", nodes: 10, active: true },
  { name: "Title Gen", description: "Generate optimized titles for videos and posts.", nodes: 9, active: true },
  { name: "Timestamps Gen", description: "Auto-generate timestamps for video content.", nodes: 9, active: true },
  { name: "Thumbnail Gen", description: "Generate and optimize thumbnails for video and social.", nodes: 11, active: true },
  { name: "Comment Gen", description: "AI-generated comments and replies for engagement.", nodes: 9, active: true },
  { name: "Get/ Update/Delete Generated posts", description: "CRUD operations for generated posts and content storage.", nodes: 9, active: true },
  { name: "Add Competitors", description: "Add and manage competitor profiles for analysis workflows.", nodes: 10, active: true },
  { name: "Article Scrapping Subworkflow", description: "Subworkflow for article scraping and parsing.", nodes: 10, active: true },
  { name: "firecrawl", description: "Web scraping and extraction using Firecrawl integration.", nodes: 14, active: true },
  { name: "Video Analysis", description: "Analyze video content and extract insights with AI.", nodes: 4, active: true },
  { name: "Social Media", description: "Large-scale social media automation and orchestration.", nodes: 106, active: false },
  { name: "SEO Monthly Reporting Automation", description: "Automated SEO reports and performance dashboards.", nodes: 14, active: false },
  { name: "Hope Immigration - End of Call", description: "Call handling and follow-up automation for Hope Immigration.", nodes: 27, active: false },
];

export function N8nWorkflows({ fullPage }: N8nWorkflowsProps) {
  return (
    <section id="n8n" className="py-24 sm:py-32 bg-transparent relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2551AF]/10 border border-[#2551AF]/20 text-[#2551AF] text-xs font-black mb-6 tracking-widest uppercase"
          >
            <Zap className="w-4 h-4" />
            <span>n8n Automation</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-[#2551AF] mb-6 tracking-tighter"
          >
            {fullPage ? (
              <>All <span className="text-[#5073be]">n8n Workflows</span></>
            ) : (
              <>Our <span className="text-[#5073be]">n8n Workflows</span></>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-[#2551AF]/70 max-w-2xl mx-auto font-medium"
          >
            Workflow automations built with n8n — content generation, analytics, scraping, email, and social media pipelines.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(fullPage ? n8nWorkflows : n8nWorkflows.slice(0, 6)).map((wf, index) => (
            <motion.div
              key={wf.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.5 }}
              className="group bg-white rounded-[2rem] border border-[#2551AF]/20 p-6 shadow-xl shadow-[rgba(37,81,175,0.08)] hover:shadow-2xl hover:shadow-[rgba(37,81,175,0.12)] hover:border-[#2551AF]/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <Workflow className="w-5 h-5 text-[#2551AF] shrink-0 mt-0.5" />
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    wf.active ? "bg-green-500/15 text-green-600" : "bg-[#2551AF]/10 text-[#2551AF]/60"
                  }`}
                >
                  {wf.active ? "Active" : "Inactive"}
                </span>
              </div>
              <h3 className="text-lg font-black text-[#2551AF] mb-2 line-clamp-2 group-hover:text-[#1a3a8a] transition-colors">
                {wf.name}
              </h3>
              <p className="text-[#2551AF]/70 text-sm line-clamp-2 mb-3">{wf.description}</p>
              <p className="text-xs font-bold text-[#2551AF]/60">{wf.nodes} nodes</p>
            </motion.div>
          ))}
        </div>

        {!fullPage && n8nWorkflows.length > 6 && (
          <div className="mt-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 28px 0 rgba(37,81,175,0.1)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                href="/workflows"
                className="px-10 py-4 bg-primary text-[#fff] font-black rounded-2xl hover:bg-primary/80 hover:text-white transition-all shadow-md relative overflow-hidden group focus:outline-none"
              >
                <span className="relative z-10">Show More Workflows</span>
                <span className="absolute left-[-60%] top-0 h-full w-1/3 rotate-12 bg-white/30 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:left-[110%] z-0" />
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
