"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle, Shield, Zap, BarChart4, Mail, Layout } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const stats = [
  { label: "Projects Delivered", value: "50+", color: "text-[#2551AF]", icon: Zap },
  { label: "Years of Experience", value: "4+", color: "text-[#2551AF]", icon: BarChart4 },
  { label: "Client Satisfaction", value: "100%", color: "text-[#2551AF]", icon: Shield },
];

const reviews = [
  {
    text: "Powerful tools for file management, communication, and performance insights",
    author: "Client from Fiverr",
    rating: 5,
    platform: "Fiverr",
    country: "United States",
    link: "https://fiverr.com"
  },
  {
    text: "Great simplified prompting counterintuitively on the discard.",
    author: "Client from Upwork",
    rating: 5,
    platform: "Upwork",
    country: "United Kingdom",
    link: "https://upwork.com"
  },
  {
    text: "EngrSquad is brilliantly providing solutions that actually work for our business goals.",
    author: "Client from Direct",
    rating: 5,
    platform: "Direct",
    country: "Germany",
    link: "#"
  },
  {
    text: "Exceptional quality and speed. The team went above and beyond.",
    author: "Client from LinkedIn",
    rating: 5,
    platform: "LinkedIn",
    country: "Canada",
    link: "https://linkedin.com"
  },
  {
    text: "Highly recommended for complex web applications.",
    author: "Client from Referral",
    rating: 5,
    platform: "Referral",
    country: "Australia",
    link: "#"
  },
  {
    text: "EngrSquad is brilliantly providing solutions that actually work for our business goals.",
    author: "Client from Direct",
    rating: 5,
    platform: "Direct",
    country: "Germany",
    link: "#"
  }
];

const faqs = [
  {
    question: "How does the project automation work?",
    answer: "EngrSquad utilizes advanced AI-driven algorithms to orchestrate workflows seamlessly. Our system is designed to handle repetitive tasks with human-like precision, ensuring efficiency while maintaining the highest safety standards across all platforms.",
    icon: Zap,
    color: "bg-[#2551AF]"
  },
  {
    question: "Is my data and account security guaranteed?",
    answer: "Security is our top priority. We employ enterprise-grade encryption and isolated cloud environments for every client. Our infrastructure includes residential proxy rotation and behavioral safety limits to ensure your projects remain secure and compliant.",
    icon: Shield,
    color: "bg-[#2551AF]"
  },
  {
    question: "Can I manage multiple team profiles?",
    answer: "Yes, our solutions are built for scale. Our enterprise dashboards allow you to manage multiple profiles, team members, and projects from a single interface. You can easily assign roles and track performance across your entire organization.",
    icon: MessageCircle,
    color: "bg-[#2551AF]"
  },
  {
    question: "What kind of performance data will I see?",
    answer: "You'll have access to comprehensive real-time analytics. This includes engagement metrics, conversion rates, team productivity stats, and ROI tracking. All data can be exported into professional, white-labeled reports.",
    icon: BarChart4,
    color: "bg-[#2551AF]"
  }
];

export const TestimonialsAndFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="testimonials" className="py-30 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Stats Section */}
        <div className="mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2551AF]/10 border border-[#2551AF]/20 text-[#2551AF] text-xs font-black mb-6 tracking-widest uppercase"
          >
            <Layout className="w-5 h-5" />
            <span>Testimonials & Stats</span>
          </motion.div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#2551AF] mb-4 tracking-tighter">Client <span className="text-[#5073be]">Testimonials</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[3rem] border border-[#2551AF]/20 shadow-xl shadow-[rgba(37,81,175,0.1)] text-center group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#2551AF]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#2551AF]/10 flex items-center justify-center text-[#2551AF] group-hover:bg-[#2551AF] group-hover:text-white transition-all duration-500 shadow-inner">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className={`text-5xl font-black mb-3 ${stat.color} tracking-tighter`}>{stat.value}</div>
                <div className="text-[#2551AF] font-black uppercase tracking-[0.2em] text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md antialiased">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2551AF]/8 rounded-full blur-[100px] -z-10" />

            <InfiniteMovingCards
              items={reviews}
              direction="left"
              speed="normal"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="pt-32 border-t border-[#2551AF]/10">
          <div className="flex flex-col lg:flex-row gap-24">
            {/* Left Side: Header */}
            <div className="lg:w-2/5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="sticky top-32"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2551AF]/10 text-[#2551AF] text-xs font-black mb-8 tracking-widest uppercase">
                  <HelpCircle className="w-4 h-4" />
                  <span>Knowledge Base</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-[#2551AF] mb-8 leading-[1.1] tracking-tighter">
                  Answers to Your <br />
                  <span className="text-[#5073be]">Common Questions</span>
                </h2>
                <p className="text-xl text-[#2551AF] mb-12 leading-relaxed font-medium">
                  New to EngrSquad? Explore our frequently asked questions to understand how we can help you scale your projects.
                </p>

                <div className="bg-white p-8 rounded-4xl border border-[#2551AF]/20 shadow-xl shadow-[rgba(37,81,175,0.1)]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#2551AF]/10 rounded-xl flex items-center justify-center text-[#2551AF]">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2551AF]">Still have questions?</h4>
                      <p className="text-sm text-[#2551AF] font-medium">We&apos;re here to help you 24/7.</p>
                    </div>
                  </div>
                  <Link href="#contact" className="block">
                    <button className="w-full py-4 bg-[#2551AF] hover:bg-white hover:text-[#2551AF] hover:border-2 hover:border-[#2551AF] text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer">
                      Contact Support
                      <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Side: Accordion */}
            <div className="lg:w-3/5 space-y-6">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`group rounded-4xl transition-all duration-500 border-2 ${isOpen
                        ? "bg-white border-[#2551AF]/20 shadow-2xl shadow-[rgba(37,81,175,0.1)]"
                        : "bg-white/80 border-[#2551AF]/20 hover:border-[#2551AF]/30"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full px-8 py-8 text-left flex items-center gap-6 cursor-pointer"
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 shadow-inner text-white ${isOpen ? "bg-[#2551AF] scale-110" : "bg-[#2551AF]"
                        }`}>
                        <faq.icon className="w-6 h-6" />
                      </div>
                      <span className={`text-xl font-black transition-colors ${isOpen ? "text-[#2551AF]" : "text-[#2551AF] group-hover:text-[#2551AF]"}`}>
                        {faq.question}
                      </span>
                      <div className={`ml-auto w-10 h-10 rounded-full bg-[#2551AF]/10 flex items-center justify-center transition-all duration-500 ${isOpen ? "rotate-180 bg-[#2551AF]/10 text-[#2551AF]" : "text-[#2551AF]"}`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-8 sm:px-28 pb-10 text-[#2551AF] text-lg leading-relaxed font-medium">
                            <div className="w-full h-px bg-[#2551AF]/10 mb-8" />
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

