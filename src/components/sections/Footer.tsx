"use client";

import {
  Github,
  Linkedin,
  Twitter,
  Atom,
  Send,
  Instagram,
  Facebook,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="bg-white border-t border-[#2551AF]/10 pt-32 pb-16">
      <div className="w-full mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-24"
        >
          {/* Logo and About */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 mb-10 group w-fit"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-12 h-12 bg-[#2551AF] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#2551AF]/20"
              >
                <Atom className="w-7 h-7" />
              </motion.div>
              <span className="text-2xl font-black text-[#2551AF] tracking-tighter">
                Postsiva<span className="text-[#2551AF]/80 ml-1">Tech</span>
              </span>
            </Link>
            <p className="text-lg text-[#2551AF] font-medium leading-relaxed mb-10 max-w-sm">
              Crafting premium digital experiences with technical excellence and
              creative innovation. We build the future of the web.
            </p>
            <div className="flex gap-5">
              {[
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/company/postiva/posts/?feedView=all",
                },
                { Icon: Twitter, href: "https://x.com/Postsiva" },
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/postsiva/",
                },
                {
                  Icon: Facebook,
                  href: "https://www.facebook.com/profile.php?id=61587174115716&_rdc=1&_rdr#",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-[#2551AF]/5 hover:bg-[#2551AF] hover:text-white rounded-2xl flex items-center justify-center text-[#2551AF] transition-colors duration-300 border border-[#2551AF]/10"
                >
                  <social.Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="font-black text-[#2551AF] mb-10 uppercase tracking-[0.2em] text-sm">
              Services
            </h4>
            <ul className="space-y-5">
              {[
                "Web Development",
                "Mobile Apps",
                "UI/UX Design",
                "Custom Software",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="#services"
                    className="text-lg text-[#2551AF] font-medium hover:text-[#2551AF]/70 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-[2px] bg-[#2551AF] transition-all duration-300"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="font-black text-[#2551AF] mb-10 uppercase tracking-[0.2em] text-sm">
              Company
            </h4>
            <ul className="space-y-5">
              {[
                { name: "Testimonials", href: "/testimonials" },
                { name: "Our Team", href: "#team" },
                { name: "Portfolio", href: "#portfolio" },
                { name: "FAQs", href: "#faq" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-lg text-[#2551AF] font-medium hover:text-[#2551AF]/70 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-[2px] bg-[#2551AF] transition-all duration-300"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="font-black text-[#2551AF] mb-10 uppercase tracking-[0.2em] text-sm">
              Stay Updated
            </h4>
            <p className="text-lg text-[#2551AF] font-medium mb-8 leading-relaxed">
              Join our newsletter for the latest tech insights and updates.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-7 py-5 bg-white border-2 border-[#2551AF]/20 rounded-3xl focus:outline-none focus:border-[#2551AF] transition-all font-bold text-[#2551AF] placeholder:text-[#2551AF]/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-2 bottom-2 px-6 bg-[#2551AF] text-white rounded-2xl hover:bg-white hover:text-[#2551AF] hover:border-2 hover:border-[#2551AF] transition-colors shadow-lg"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="pt-12 border-t border-[#2551AF]/10 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <p className="text-[#2551AF] font-bold text-base">
            © 2026 Postsiva Tech All Rights Reserved.
          </p>
          <div className="flex gap-10">
            <Link
              href="https://privacy-policy.postsiva.com/"
              target="_blank"
              className="text-[#2551AF] font-bold text-base hover:opacity-70 transition-opacity"
            >
              Privacy Policy
            </Link>
            <Link
              href="https://terms.postsiva.com/"
              target="_blank"
              className="text-[#2551AF] font-bold text-base hover:opacity-70 transition-opacity"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
