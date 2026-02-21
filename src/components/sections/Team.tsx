"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, Linkedin, Mail, X, ZoomIn, ExternalLink } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { seniorDevelopers, testimonialTeam } from "@/lib/team-data";

// Fully responsive and mobile responsive design for the team section
export const Team = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="team" className="py-20 sm:py-28 lg:py-32 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 sm:p-8 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full h-[92vh] rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative w-full h-full"
              >
                <Image
                  src={selectedImage}
                  alt="Enlarged team member"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1280px) 100vw, 86vh"
                  priority
                />
              </motion.div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-2xl bg-[#2551AF]/10 hover:bg-[#2551AF] hover:text-white flex items-center justify-center text-[#2551AF] transition-all border border-[#2551AF]/20 hover:scale-110 z-20"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-[#2551AF]/10 border border-[#2551AF]/20 text-[#2551AF] text-xs sm:text-sm font-black mb-6 sm:mb-8 tracking-widest uppercase shadow-sm"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Our Expert Team</span>
          </motion.div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-[#2551AF] mb-4 sm:mb-8 tracking-tighter leading-tight sm:leading-[1.1]">
            Meet the <span className="text-[#5073be]">Innovators</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-[#2551AF] max-w-md sm:max-w-3xl mx-auto font-bold leading-relaxed">
            Our diverse group of passionate developers and designers bring technical excellence to every project
          </p>
        </div>

        {/* Manager and Team Leaders Area */}
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex justify-center items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-[#2551AF]/10 border border-[#2551AF]/20 text-[#2551AF] text-xs sm:text-sm font-black mb-5 sm:mb-8 tracking-widest uppercase shadow-sm"
          >
            <span>Team Leaders</span>
          </motion.div>
          <span className="text-base sm:text-xl md:text-2xl text-[#2551AF] max-w-lg sm:max-w-5xl mx-auto font-semibold leading-relaxed text-center">
            Our team leaders are the backbone of our team
          </span>
          <span className="hidden sm:inline text-base sm:text-xl md:text-2xl text-[#2551AF] max-w-lg sm:max-w-5xl mx-auto font-semibold leading-relaxed text-center">
            They bring deep expertise and a shared passion for delivering outstanding results
          </span>
          <span className="sm:hidden text-base text-[#2551AF] mt-2 font-semibold leading-relaxed text-center">
            They bring deep expertise and passion for results
          </span>
        </div>

        {/* Senior Developer Cards - Rewrite order as: Image, Name, Role, Description, Icons, View Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto mb-20 sm:mb-28">
          {seniorDevelopers.map((dev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6, type: "spring", stiffness: 50 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="relative group h-full w-full"
            >
              <div className="absolute -inset-1 bg-[#2551AF]/10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              <div className="bg-white border border-[#2551AF]/20 rounded-4xl p-8 sm:p-10 shadow-xl shadow-[rgba(37,81,175,0.1)] h-full flex flex-col gap-8 items-center relative overflow-hidden transition-all duration-500 group-hover:border-[#2551AF]/30 group-hover:shadow-[rgba(37,81,175,0.15)]">

                {/* Image */}
                <div
                  className="relative shadow-xl h-64 w-64 shrink-0 rounded-3xl overflow-hidden group-hover:scale-[1.05] transition-transform duration-700 ring-4 ring-white cursor-zoom-in"
                  onClick={() => setSelectedImage(dev.image)}
                >
                  <Image
                    src={dev.image}
                    alt={dev.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 256px, 320px"
                  />
                  <div className="absolute inset-0 bg-[#2551AF]/10 group-hover:bg-transparent transition-colors duration-500 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-2xl sm:text-4xl font-black text-[#2551AF] tracking-tight leading-tight transition-colors text-center ">
                  {dev.name}
                </h3>

                {/* Role */}
                <div className="inline-block px-6 py-2 rounded-full bg-[#2551AF]/10 text-[#2551AF] font-bold text-xs uppercase tracking-widest  whitespace-nowrap shadow-sm border border-[#2551AF]/20 text-center">
                  {dev.role}
                </div>

                {/* Description */}
                <p className="text-[#2551AF] font-medium text-lg leading-relaxed  max-w-sm mx-auto text-center">
                  {dev.description}
                </p>

                {/* Social Icons (Icons) */}
                <div className="flex items-center justify-center gap-5">
                  {dev.socials.linkedin && (
                    <a href={dev.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#2551AF]/10 border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF] hover:text-white transition-all shadow-sm">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  )}
                  {dev.socials.email && (
                    <a href={`mailto:${dev.socials.email}`} className="w-12 h-12 rounded-xl bg-[#2551AF]/10 border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF] hover:text-white transition-all shadow-sm">
                      <Mail className="w-6 h-6" />
                    </a>
                  )}
                  {dev.socials.phone && (
                    <a href={`https://wa.me/${dev.socials.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#2551AF]/10 border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF] hover:text-white transition-all shadow-sm">
                      <FaWhatsapp className="w-6 h-6" />
                    </a>
                  )}
                </div>

                {/* View Full Profile button */}
                <div className="w-full mt-auto ">
                  <Link
                    href={`/team/${dev.slug}`}
                    className="w-full py-5 bg-[#2551AF] text-white rounded-2xl font-black shadow-lg shadow-[#2551AF]/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all group/btn cursor-pointer"
                  >
                    View Full Profile
                    <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Members Heading */}
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex justify-center items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-[#2551AF]/10 border border-[#2551AF]/20 text-[#2551AF] text-xs sm:text-sm font-black mb-5 sm:mb-8 tracking-widest uppercase shadow-sm"
          >
            <span>Team Members</span>
          </motion.div>
          <span className="hidden sm:inline text-base sm:text-xl md:text-2xl text-[#2551AF] max-w-md sm:max-w-4xl mx-auto font-semibold leading-relaxed text-center">
            Discover the talented professionals behind Postsiva Tech, driving innovation and powering our success
          </span>
          <span className="sm:hidden text-base text-[#2551AF] mt-2 font-semibold leading-relaxed text-center">
            Our team members are the heart of our company and driving innovation forward
          </span>
        </div>

        {/* Team Members Grid - Same card style as Team Leaders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {testimonialTeam.map((member, index) => (
            <motion.div
              key={member.slug}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6, type: "spring", stiffness: 50 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="relative group h-full w-full"
            >
              <div className="absolute -inset-1 bg-[#2551AF]/10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <div className="bg-white border border-[#2551AF]/20 rounded-4xl p-8 sm:p-10 shadow-xl shadow-[rgba(37,81,175,0.1)] h-full flex flex-col gap-8 items-center relative overflow-hidden transition-all duration-500 group-hover:border-[#2551AF]/30 group-hover:shadow-[rgba(37,81,175,0.15)]">
                <div
                  className="relative shadow-xl h-64 w-64 shrink-0 rounded-3xl overflow-hidden group-hover:scale-[1.05] transition-transform duration-700 ring-4 ring-white cursor-zoom-in"
                  onClick={() => setSelectedImage(member.image)}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 256px, 320px"
                  />
                  <div className="absolute inset-0 bg-[#2551AF]/10 group-hover:bg-transparent transition-colors duration-500 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-[#2551AF] tracking-tight leading-tight transition-colors text-center">
                  {member.name}
                </h3>
                <div className="inline-block px-6 py-2 rounded-full bg-[#2551AF]/10 text-[#2551AF] font-bold text-xs uppercase tracking-widest whitespace-nowrap shadow-sm border border-[#2551AF]/20 text-center">
                  {member.role}
                </div>
                <p className="text-[#2551AF] font-medium text-lg leading-relaxed max-w-sm mx-auto text-center">
                  {member.description}
                </p>
                <div className="flex items-center justify-center gap-5">
                  {member.socials?.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#2551AF]/10 border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF] hover:text-white transition-all shadow-sm">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  )}
                  {member.socials?.email && (
                    <a href={`mailto:${member.socials.email}`} className="w-12 h-12 rounded-xl bg-[#2551AF]/10 border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF] hover:text-white transition-all shadow-sm">
                      <Mail className="w-6 h-6" />
                    </a>
                  )}
                  {member.socials?.phone && (
                    <a href={`https://wa.me/${member.socials.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#2551AF]/10 border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF] hover:text-white transition-all shadow-sm">
                      <FaWhatsapp className="w-6 h-6" />
                    </a>
                  )}
                </div>
                <div className="w-full mt-auto">
                  <Link
                    href={`/team/${member.slug}`}
                    className="w-full py-5 bg-[#2551AF] text-white rounded-2xl font-black shadow-lg shadow-[#2551AF]/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all group/btn cursor-pointer"
                  >
                    View Full Profile
                    <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
