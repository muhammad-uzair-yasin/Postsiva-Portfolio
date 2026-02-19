"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Atom } from "lucide-react";
import { ShinyButton } from "../ui/shiny-button";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Team", href: "#team" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-6xl transition-all duration-500 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 py-2 ${
          scrolled
            ? "bg-white/50 shadow-2xl shadow-[rgba(37,81,175,0.05)] scale-[0.98] border-[#2551AF]/10"
            : "bg-white/50"
        }`}
      >
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="w-10 h-10 sm:w-10 sm:h-10 bg-[#2551AF] rounded-full flex items-center justify-center text-white shadow-lg shadow-[rgba(37,81,175,0.3)]"
          >
            <Atom className="w-7 h-7 sm:w-6 sm:h-6" />
          </motion.div>
          <span className="text-[#2551AF] font-extrabold text-lg sm:text-xl tracking-tight">
            Postsiva<span className="text-[#2551AF]/80 ml-1">Tech</span>
          </span>
        </Link>

        {/* Center: Nav Links - Desktop Only */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[#2551AF] font-semibold hover:text-[#2551AF] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side: Contact Us */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ShinyButton href="#contact" className="text-sm sm:text-base">
              Contact Us
            </ShinyButton>
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
};
