"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, ChevronDown } from "lucide-react";
import { Footer } from "./Footer";

export const ContactAndFooter = () => {
  const [subject, setSubject] = useState("Web Development");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error?.message ?? data.error ?? "Failed to send");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const subjects = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Consultation",
    "Other"
  ];

  return (
    <>
      <section id="contact" className="pt-29 bg-white relative overflow-hidden">

        {/* Custom contact section grid background */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <svg
            className="w-full h-full"
            style={{ minHeight: 480 }}
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="40" height="40" fill="white" />
                <rect x="0" y="0" width="40" height="40" fill="none" stroke="#2551AF" strokeWidth="0.7" opacity="0.06" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="container mx-auto px-6 mb-32 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2551AF]/10 border border-[#2551AF]/20 text-[#2551AF] text-xs font-black mb-6 tracking-widest uppercase"
            >
              <Mail className="w-5 h-5" />
              <span>Get in Touch</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black text-[#2551AF] mb-4 tracking-tighter">
              Ready to Start Your <span className="text-[#5073be]">Next Project?</span>
            </h2>
            <p className="max-w-2xl mx-auto text-[#2551AF] font-medium text-lg">
              Whether you have a specific project in mind or just want to explore possibilities,
              we&apos;re here to help you turn your vision into reality.
            </p>
          </div>

          <div className="max-w-6xl mx-auto bg-white rounded-[3.5rem] overflow-hidden shadow-xl shadow-[rgba(37,81,175,0.1)] border border-[#2551AF]/20 flex flex-col lg:flex-row">
            {/* Contact Info */}
            <div className="lg:w-2/5 bg-[#2551AF] p-12 sm:p-16 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-4xl font-black mb-8 tracking-tighter">Let&apos;s build something <br /> amazing together.</h2>
                <p className="text-white font-medium text-lg mb-12">
                  Have a project in mind? Looking for a long-term partner? We&apos;re ready to help you scale.
                </p>
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-bold uppercase tracking-widest">Email Us</div>
                      <div className="text-lg font-bold">info@postsiva.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-bold uppercase tracking-widest">Call Us</div>
                      <div className="text-lg font-bold">+(92) 323 6891550</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-bold uppercase tracking-widest">Visit Us</div>
                      <div className="text-lg font-bold">Islamabad, Pakistan</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Background decorative circles */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2551AF]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            </div>
            {/* Contact Form */}
            <div className="lg:w-3/5 p-12 sm:p-16">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {status === "success" && (
                  <p className="text-green-600 font-bold text-center py-2">Message sent. We&apos;ll get back to you soon.</p>
                )}
                {status === "error" && errorMessage && (
                  <p className="text-red-600 font-bold text-center py-2">{errorMessage}</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-black text-[#2551AF] uppercase tracking-widest">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-6 py-4 bg-white border border-[#2551AF]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-[#2551AF] uppercase tracking-widest">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-6 py-4 bg-white border border-[#2551AF]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-3 relative">
                  <label className="text-sm font-black text-[#2551AF] uppercase tracking-widest">Subject</label>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-6 py-4 bg-white border border-[#2551AF]/20 rounded-2xl flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all font-medium text-left"
                    >
                      <span className="text-[#2551AF]">{subject}</span>
                      <ChevronDown className={`w-5 h-5 text-[#2551AF] transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 5, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 z-50 bg-white border border-[#2551AF]/20 rounded-2xl shadow-2xl overflow-hidden py-2"
                        >
                          {subjects.map((item) => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => {
                                setSubject(item);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full px-6 py-3 text-left transition-all font-bold ${subject === item
                                  ? "bg-[#2551AF] text-white"
                                  : "text-[#2551AF] hover:bg-[#2551AF]/10"
                                }`}
                            >
                              {item}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black text-[#2551AF] uppercase tracking-widest">Your Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-6 py-4 bg-white border border-[#2551AF]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all font-medium resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-5 bg-[#2551AF] hover:bg-white hover:text-[#2551AF] hover:border-2 hover:border-[#2551AF] text-white font-black rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
