"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Award, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { CertificateWithMember } from "@/lib/landing-data";

interface CertificatesProps {
  certificates: CertificateWithMember[];
  /** When true, used on /certificates page: "All Certificates" title and no "Show More" button */
  fullPage?: boolean;
}

export const Certificates = ({ certificates, fullPage }: CertificatesProps) => {
  return (
    <section id="certificates" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2551AF]/10 border border-[#2551AF]/20 text-[#2551AF] text-xs font-black mb-6 tracking-widest uppercase"
          >
            <Award className="w-4 h-4" />
            <span>Professional Excellence</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-[#2551AF] mb-6 tracking-tighter"
          >
            {fullPage ? (
              <>All <span className="text-[#5073be]">Certifications</span></>
            ) : (
              <>Our <span className="text-[#5073be]">Certifications</span></>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#2551AF]/70 max-w-2xl mx-auto font-medium"
          >
            Our team holds world-class certifications from leading technology providers, ensuring the highest standards of quality and expertise.
          </motion.p>
        </div>

        {certificates.length === 0 ? (
          <p className="text-center text-[#2551AF]/60 font-medium">No certificates added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(fullPage ? certificates : certificates.slice(0, 6)).map((cert, index) => (
              <motion.div
                key={`${cert.memberName}-${cert.name}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white border border-[#2551AF]/20 rounded-[2.5rem] overflow-hidden shadow-xl shadow-[rgba(37,81,175,0.1)] flex flex-col h-full transition-all duration-500 hover:shadow-2xl hover:shadow-[rgba(37,81,175,0.12)]"
              >
                {/* Image Preview */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#2551AF]/5 p-4">
                  {cert.image ? (
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      className="object-contain transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Award className="w-16 h-16 text-[#2551AF]/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[#2551AF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2551AF] border border-[#2551AF]/20">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center z-20 transition-transform duration-500 group-hover:rotate-12">
                    <Award className="w-6 h-6 text-[#2551AF]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col grow">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      {cert.year && (
                        <>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2551AF]/40">
                            {cert.year}
                          </span>
                          <div className="w-1 h-1 rounded-full bg-[#2551AF]/20" />
                        </>
                      )}
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2551AF]/40">
                        {cert.issuer ?? cert.memberName}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-[#2551AF] leading-tight group-hover:text-[#1a3a8a] transition-colors line-clamp-2">
                      {cert.name}
                    </h3>
                    <p className="text-xs font-bold text-[#2551AF]/60 mt-1">{cert.memberName}</p>
                  </div>

                  <div className="mt-auto">
                    {cert.link ? (
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
                    ) : (
                      <span className="text-sm font-black text-[#2551AF]/60">Certificate</span>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#2551AF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        )}

        {!fullPage && certificates.length > 6 && (
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
                href="/certificates"
                className="px-10 py-4 bg-primary text-[#fff] font-black rounded-2xl hover:bg-primary/80 hover:text-white transition-all shadow-md relative overflow-hidden group focus:outline-none"
              >
                <span className="relative z-10">Show More Certificates</span>
                <span className="absolute left-[-60%] top-0 h-full w-1/3 rotate-12 bg-white/30 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:left-[110%] z-0" />
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
