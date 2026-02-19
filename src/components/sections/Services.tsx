"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Code2, Smartphone, Globe, Layers, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const services = [
    {
        title: "Web Development",
        description: "Building high-performance, scalable web applications using React, Next.js, and modern technologies. We focus on speed, SEO, and user experience.",
        detailedDescription: "Our web development process involves a deep dive into your business requirements to create a solution that not only looks great but performs exceptionally. We specialize in:",
        features: ["Custom Next.js & React Apps", "E-commerce Solutions", "API Integration", "Performance Optimization"],
        icon: Globe,
        image: "/web-development2.png",
        color: "bg-primary",
        shadow: "shadow-primary/20"
    },
    {
        title: "Mobile App Development",
        description: "Creating seamless cross-platform mobile experiences with React Native and Flutter. We deliver native-like performance and intuitive interfaces.",
        detailedDescription: "We build mobile applications that provide a native feel on both iOS and Android. Our approach ensures consistency across platforms while leveraging device-specific features:",
        features: ["iOS & Android Development", "Cross-Platform with React Native", "User-Centric UI/UX", "Offline Capabilities"],
        icon: Smartphone,
        image: "/mobile-development2.png",
        color: "bg-primary",
        shadow: "shadow-primary/20"
    },
    {
        title: "UI/UX Design",
        description: "Designing user-centric interfaces that engage and convert. We combine aesthetic beauty with functional clarity to create memorable digital products.",
        detailedDescription: "Design is more than just aesthetics; it's about how users interact with your brand. Our design team focuses on creating intuitive flows and engaging visuals:",
        features: ["User Research & Personas", "Wireframing & Prototyping", "Interactive Design", "Visual Identity Systems"],
        icon: Layers,
        image: "/ui-ux-design1.png",
        color: "bg-primary",
        shadow: "shadow-primary/20"
    },
    {
        title: "Custom SaaS Solutions",
        description: "Tailored SaaS architecture designed for growth. From complex dashboards to automation tools, we build solutions that fit your business needs.",
        detailedDescription: "We help you build and scale your SaaS product with a robust architecture that can handle multi-tenancy, complex subscriptions, and high-volume data:",
        features: ["Scalable Architecture", "Subscription Management", "Admin Dashboards", "Data Analytics & Reporting"],
        icon: Code2,
        image: "/custom-saas-solutions3.png",
        color: "bg-primary",
        shadow: "shadow-primary/20"
    },
    {
        title: "Custom Automation Solutions",
        description: "Seamless integration and automation using cutting-edge platforms like n8n, Zapier, Make.com, and GoHighLevel. We connect all your tools and automate complex business processes.",
        detailedDescription: "Unlock efficiency and accelerate growth with our expert automation services. We specialize in building custom automations and integrations across all major no-code/low-code platforms (n8n, Zapier, Make.com, GoHighLevel) so your systems work together flawlessly:",
        features: [
            "No-code & Low-code Automation (n8n, Zapier, Make.com, GoHighLevel)",
            "Third-Party Platform Integrations",
            "Custom API Connections",
            "CRM & Marketing Automation",
            "Data Syncing & Workflow Orchestration"
        ],
        icon: Code2,
        image: "/custom-saas-solutions1.png",
        color: "bg-primary",
        shadow: "shadow-primary/20"
    },
];

export const Services = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="services" className="py-32 relative overflow-hidden bg-transparent">
            <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2551AF]/10 border border-[#2551AF]/20 text-[#2551AF] text-sm font-bold mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-[#2551AF]" />
                        <span>Our Expertise</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-[#2551AF] mb-8 tracking-tighter"
                    >
                        Our <span className="text-[#5073be]">Key Services</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-[#1a3a8a] max-w-2xl mx-auto font-medium"
                    >
                        Empowering your business with cutting-edge software solutions designed for growth and excellence.
                    </motion.p>
                </div>

                <div ref={containerRef} className="relative max-w-6xl mx-auto">
                    {/* Vertical Line Container */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-[#2551AF]/10 -translate-x-1/2 rounded-full hidden md:block overflow-hidden">
                        <motion.div
                            style={{ scaleY, originY: 0 }}
                            className="absolute inset-0 bg-[#2551AF] rounded-full"
                        />
                    </div>

                    <div className="space-y-40">
                        {services.map((service, index) => {
                            const isExpanded = expandedIndex === index;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className={`relative flex flex-col md:flex-row items-start gap-16 md:gap-24 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Step Content */}
                                    <div className="flex-1 text-center md:text-left">
                                        <div className={`flex flex-col items-center ${index % 2 === 1 ? "md:items-end md:text-right" : "md:items-start"}`}>
                                            <div className="text-[#2551AF] font-black text-8xl mb-6 opacity-10 tracking-tighter">0{index + 1}</div>
                                            <h3 className="text-3xl font-black text-[#2551AF] mb-6 leading-tight transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-lg text-[#1a3a8a] leading-relaxed font-medium mb-8">
                                                {service.description}
                                            </p>

                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pb-8">
                                                            <p className="text-[#1a3a8a]/90 font-medium mb-6">
                                                                {service.detailedDescription}
                                                            </p>
                                                            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${index % 2 === 1 ? "md:justify-items-end" : ""}`}>
                                                                {service.features.map((feature, fIndex) => (
                                                                    <div key={fIndex} className="flex items-center gap-2 text-[#2551AF] font-bold">
                                                                        <CheckCircle2 className="w-5 h-5 text-[#2551AF]" />
                                                                        <span>{feature}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <button
                                                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                                className="flex items-center gap-2 text-[#2551AF] font-bold hover:gap-3 transition-all cursor-pointer group"
                                            >
                                                {isExpanded ? "Show less" : "Learn more"}
                                                <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-90" : "group-hover:translate-x-1"}`} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Step Icon (Center) */}
                                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-[#2551AF] border-2 border-[#2551AF] rounded-2xl z-20 hidden md:flex items-center justify-center text-white shadow-lg shadow-[rgba(37,81,175,0.2)] group overflow-hidden">
                                        <service.icon className="w-8 h-8 relative z-10 transition-transform group-hover:scale-110" />
                                    </div>

                                    {/* Step Visual */}
                                    <div className="flex-1 w-full perspective-1000">
                                        <motion.div
                                            whileHover={{ scale: 1.05, rotateY: index % 2 === 0 ? 5 : -5 }}
                                            className="bg-white rounded-[3rem] overflow-hidden border border-[#2551AF]/20 shadow-xl shadow-[rgba(37,81,175,0.1)] aspect-16/10 relative group"
                                        >
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-[#2551AF]/5 group-hover:bg-transparent transition-colors duration-500" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

