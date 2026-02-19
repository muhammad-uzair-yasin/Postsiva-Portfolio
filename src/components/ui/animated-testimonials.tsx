"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Linkedin, Mail, ExternalLink } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  slug?: string;
  socials?: {
    linkedin?: string;
    email?: string;
    phone?: string;
  };
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay && !isHovering) {
      const interval = setInterval(handleNext, 3000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext, isHovering]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div
      className={cn("max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20 flex flex-col items-center justify-center", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-1000 flex items-center justify-center bg-black/80 p-4 sm:p-8 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full aspect-square sm:aspect-video rounded-3xl overflow-hidden shadow-2xl bg-white"
            >
              <Image
                src={selectedImage}
                alt="Enlarged team member"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-2xl bg-black/50 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white transition-all z-50 shadow-xl border border-white/20 hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center w-full">
        <div className="relative h-[210px] sm:h-[300px] md:h-[370px] w-[210px] sm:w-[300px] md:w-[370px] mx-auto">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index)
                    ? 999
                    : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -20, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 origin-bottom cursor-zoom-in group/image"
                onClick={() => isActive(index) && setSelectedImage(testimonial.src)}
              >
                <Image
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={370}
                  height={370}
                  draggable={false}
                  className="h-full w-full rounded-[2.5rem] object-cover object-center shadow-[0_18px_40px_rgba(37,81,175,0.15)]"
                  priority={index === 0}
                />
                {isActive(index) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/image:bg-black/10 transition-colors duration-500 rounded-[2.5rem]">
                    <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <motion.div
          key={active}
          initial={{
            y: 30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -30,
            opacity: 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="flex flex-col items-center w-full"
        >
          <div className="space-y-4 mt-8 text-center w-full flex flex-col items-center">
            <h3 className="text-3xl md:text-4xl font-black text-[#2551AF] tracking-tighter leading-tight">
              {testimonials[active].name}
            </h3>
            <div className="inline-flex px-4 py-1.5 rounded-full bg-[#2551AF]/10 text-[#2551AF] font-bold text-base md:text-lg">
              {testimonials[active].designation}
            </div>
          </div>

          <motion.p className="text-lg md:text-2xl text-[#2551AF] font-medium mt-8 leading-relaxed max-w-xl text-center mx-auto">
            {testimonials[active].quote.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{
                  filter: "blur(10px)",
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  filter: "blur(0px)",
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: 0.015 * index,
                }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.p>

          {/* Social Icons moved to after description */}
          {testimonials[active].socials && (
            <div className="flex items-center justify-center gap-4 mb-2 mt-6">
              {testimonials[active].socials?.linkedin && (
                <a href={testimonials[active].socials?.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#2551AF]/10 border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF] hover:text-white transition-all shadow-sm">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {testimonials[active].socials?.email && (
                <a href={`mailto:${testimonials[active].socials?.email}`} className="w-10 h-10 rounded-xl bg-[#2551AF]/10 border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF] hover:text-white transition-all shadow-sm">
                  <Mail className="w-5 h-5" />
                </a>
              )}
              {testimonials[active].socials?.phone && (
                <a href={`https://wa.me/${testimonials[active].socials?.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#2551AF]/10 border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF] hover:text-white transition-all shadow-sm">
                  <FaWhatsapp className="w-5 h-5" />
                </a>
              )}
            </div>
          )}

          {/* View Full Profile Button at Bottom */}
          {testimonials[active].slug && (
            <div className="mt-8 w-full max-w-xs">
              <Link
                href={`/team/${testimonials[active].slug}`}
                className="w-full py-4 bg-[#2551AF] text-white rounded-2xl font-black shadow-lg shadow-[#2551AF]/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all group/btn cursor-pointer"
              >
                View Full Profile
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Link>
            </div>
          )}

          {/* Navigation arrows */}
          <div className="flex gap-4 mt-10 justify-center">
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-[#2551AF]/10 flex items-center justify-center group/button hover:bg-[#2551AF] transition-all shadow-lg hover:shadow-[#2551AF]/20"
            >
              <IconArrowLeft className="h-6 w-6 text-[#2551AF] group-hover/button:text-white group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-[#2551AF]/10 flex items-center justify-center group/button hover:bg-[#2551AF] transition-all shadow-lg hover:shadow-[#2551AF]/20"
            >
              <IconArrowRight className="h-6 w-6 text-[#2551AF] group-hover/button:text-white group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
