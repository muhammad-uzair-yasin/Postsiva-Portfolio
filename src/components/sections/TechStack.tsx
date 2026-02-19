"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import Image from "next/image";

const stacks = [
  {
    title: "Frontend Development",
    description: "React, Next.js, Tailwind CSS, Framer Motion",
    image: "/frontend-development1.png",
    bgColor: "bg-[#adc7f6]/20"
  },
  {
    title: "Backend Solutions",
    description: "Node.js, Python, Django, PostgreSQL, Redis",
    image: "/backend-development1.png",
    bgColor: "bg-[#adc7f6]/20"
  },
  {
    title: "Mobile Applications",
    description: "React Native, Flutter, iOS, Android",
    image: "/mobile-development2.png",
    bgColor: "bg-[#adc7f6]/20"
  },
  {
    title: "Cloud & DevOps",
    description: "AWS, Docker, Kubernetes, Vercel, CI/CD",
    image: "/cloud-devops1.png",
    bgColor: "bg-[#adc7f6]/20"
  },
];

export const TechStack = () => {
  return (
    <section className="py-32 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2551AF]/10 border border-[#2551AF]/20 text-[#2551AF] text-xs font-black mb-6 tracking-widest uppercase"
          >
            <Cpu className="w-4 h-4" />
            <span>Our Stack</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-[#2551AF] mb-6 tracking-tighter">
            Our <span className="text-[#5073be]">Technology Ecosystem</span>
          </h2>
          <p className="text-xl text-[#1a3a8a] max-w-2xl mx-auto font-medium">
            We leverage a world-class tech stack to build high-performance digital products that scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {stacks.map((stack, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                y: -15,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white rounded-[3rem] overflow-hidden border border-[#2551AF]/20 shadow-xl shadow-[rgba(37,81,175,0.1)] group hover:shadow-2xl hover:shadow-[rgba(37,81,175,0.12)] transition-all duration-300 flex flex-col sm:flex-row h-full"
            >
              {/* Left/Top Image Container */}
              <div className={`p-8 ${stack.bgColor} relative w-full sm:w-[52%] flex items-center justify-center`}>
                <div className="relative w-full aspect-[5/4] rounded-3xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-700">
                  <Image
                    src={stack.image}
                    alt={stack.title}
                    fill
                    className="object-fill"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-[#2551AF]/5 group-hover:bg-transparent transition-colors" />
                </div>
              </div>

              {/* Right/Bottom Content Container */}
              <div className="p-10 sm:p-12 flex flex-col justify-center flex-grow sm:w-3/5">
                <h3 className="text-3xl font-black text-[#2551AF] mb-4 transition-colors tracking-tighter">
                  {stack.title}
                </h3>
                <p className="text-[#1a3a8a] font-bold leading-relaxed text-lg">
                  {stack.description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-[#2551AF] font-black text-sm uppercase tracking-widest">
                  View Expertise
                  <div className="w-8 h-px bg-[#2551AF]/30 group-hover:w-12 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 flex flex-wrap justify-center items-center gap-6"
        >
          {["React.js", "Next.js", "Node.js", "Python", "FastAPI", "Django", "Tailwind CSS", "UI/UX Design", "N8N Workflows", "Scraping Data", "Custom Automation", "AWS", "Docker"].map((tech) => (
            <span key={tech} className="text-sm sm:text-base font-black text-[#2551AF] bg-[#2551AF]/10 border border-[#2551AF]/20 px-6 py-1 rounded-full transition-all cursor-default shadow-sm hover:shadow-md hover:-translate-y-0.5">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

