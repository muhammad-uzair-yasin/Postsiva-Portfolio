"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Sparkles, Medal, ShieldCheck, Trophy } from "lucide-react";
import Image from "next/image";

const certificates = [
  {
    title: "AI For Everyone",
    issuer: "DeepLearning.AI",
    date: "2025",
    image: "/uzair-detail/Al-For-Everyone-(DeepLearningAl).png",
    link: "https://www.coursera.org/account/accomplishments/verify/E7TKKCDZCET7",
    icon: Sparkles,
    color: "bg-[#2551AF]"
  },
  {
    title: "n8n Automation Expert",
    issuer: "Udemy",
    date: "2024",
    image: "/maryam-detail/n8n-Automation.png",
    link: "https://www.udemy.com/certificate/UC-638baeaa-6453-4da2-aa24-20facc3708c3/",
    icon: ShieldCheck,
    color: "bg-[#2551AF]"
  },
  {
    title: "Crash Course on Python",
    issuer: "Google",
    date: "2025",
    image: "/uzair-detail/Crash-Course-on-Python-(Google).png",
    link: "https://www.coursera.org/account/accomplishments/verify/0AC62NB76RPV",
    icon: Medal,
    color: "bg-[#2551AF]"
  },
  {
    title: "Introduction to FastAPI Framework",
    issuer: "Duke University",
    date: "2025",
    image: "/uzair-detail/Introduction-to-FastAPI-Framework(Duke-University).png",
    link: "https://www.coursera.org/account/accomplishments/verify/6SQCYK51ATQ3",
    icon: Trophy,
    color: "bg-[#2551AF]"
  },
  {
    title: "Introduction to HTML, CSS, & JS",
    issuer: "IBM",
    date: "2025",
    image: "/uzair-detail/Introduction-to-HTML-CSS-&-JavaScript-(IBM).png",
    link: "https://www.coursera.org/account/accomplishments/verify/6LJPLMFC408J",
    icon: Award,
    color: "bg-[#2551AF]"
  },
  {
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    date: "2024",
    image: "/uzair-detail/Career-Essentials-in-Generative-Al-(Microsoft and Linkedin).png",
    link: "https://www.linkedin.com/posts/uzair-yasin_certificate-of-completion-activity-7169777884792799232-pbrh/",
    icon: ShieldCheck,
    color: "bg-[#2551AF]"
  }
];

export const Certificates = () => {
  return (
    <section id="certificates" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2551AF]/10 border border-[#2551AF]/20 text-[#2551AF] text-xs font-black mb-6 tracking-widest uppercase"
          >
            <Award className="w-4 h-4" />
            <span>Professional Excellence</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-[#2551AF] mb-6 tracking-tighter"
          >
            Our <span className="text-[#5073be]">Certifications</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-[#2551AF]/70 max-w-2xl mx-auto font-medium"
          >
            Our team holds world-class certifications from leading technology providers, ensuring the highest standards of quality and expertise.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white border border-[#2551AF]/20 rounded-[2.5rem] overflow-hidden shadow-xl shadow-[rgba(37,81,175,0.1)] flex flex-col h-full transition-all duration-500 hover:shadow-2xl hover:shadow-[rgba(37,81,175,0.12)]"
            >
              {/* Image Preview */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#2551AF]/5 p-4">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#2551AF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2551AF] border border-[#2551AF]/20">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>

                {/* Float Icon */}
                <div className={`absolute top-4 right-4 w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center z-20 transition-transform duration-500 group-hover:rotate-12`}>
                  <cert.icon className="w-6 h-6 text-[#2551AF]" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col grow">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2551AF]/40">
                      {cert.date}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-[#2551AF]/20" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2551AF]/40">
                      {cert.issuer}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-[#2551AF] leading-tight group-hover:text-[#1a3a8a] transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                </div>

                <div className="mt-auto">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-black text-[#2551AF] hover:text-[#1a3a8a] group/link transition-colors"
                  >
                    <span>View Official Certificate</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.div>
                  </a>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#2551AF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
