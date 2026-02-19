"use client";

import { useState, useEffect } from "react";
import { X, Star, Link as LinkIcon, Globe, CheckCircle2, Loader2, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
  platform: string;
  country: string;
  link: string;
}

interface ReviewFormProps {
  review?: Review | null;
  onSave: (review: Review) => void;
  onCancel: () => void;
}

export function ReviewForm({ review, onSave, onCancel }: ReviewFormProps) {
  const [formData, setFormData] = useState<Omit<Review, 'id'>>({
    author: "",
    text: "",
    rating: 5,
    platform: "Fiverr",
    country: "",
    link: "",
  });

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const platforms = [
    { label: "Fiverr", value: "Fiverr" },
    { label: "Upwork", value: "Upwork" },
    { label: "Direct Client", value: "Direct Client" },
    { label: "LinkedIn", value: "LinkedIn" },
    { label: "Referral", value: "Referral" }
  ];

  useEffect(() => {
    if (review) {
      setFormData({
        ...review,
      });
    }
  }, [review]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    
    setTimeout(() => {
      setSaveStatus("success");
      setTimeout(() => {
        onSave({
          ...formData,
          id: review?.id || Math.floor(Math.random() * 10000),
        });
      }, 800);
    }, 1200);
  };

  return (
    <div className="bg-white border border-[#2551AF]/20 rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-10 lg:p-12 w-full max-w-2xl mx-auto overflow-y-auto max-h-[90vh] hide-scrollbar shadow-2xl relative">
      <div className="flex justify-between items-start sm:items-center mb-8 sm:mb-10">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1a3a8a] tracking-tighter">
            {review ? "Edit Review" : "Add New Review"}
          </h2>
          <p className="text-slate-500 font-medium text-xs sm:text-sm mt-1">Share a success story from your clients.</p>
        </div>
        <button 
          onClick={onCancel} 
          className="p-2 sm:p-3 hover:bg-[#2551AF]/5 rounded-xl sm:rounded-2xl transition-all group active:scale-90 border border-transparent hover:border-[#2551AF]/15 shrink-0"
        >
          <X className="w-5 h-5 sm:w-6 h-6 text-[#2551AF]/60 group-hover:text-[#1a3a8a]" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        <div className="space-y-2 sm:space-y-3">
          <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">Client Name / Author</label>
          <input
            required
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl sm:rounded-2xl text-[#1a3a8a] font-medium focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all text-sm sm:text-base"
            placeholder="e.g. John Doe"
          />
        </div>

        <div className="space-y-2 sm:space-y-3">
          <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">Review Content</label>
          <textarea
            required
            rows={4}
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl sm:rounded-2xl text-[#1a3a8a] font-medium focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all resize-none text-sm sm:text-base"
            placeholder="The client's testimonial message..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-2 sm:space-y-3">
            <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">Platform Source</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl sm:rounded-2xl text-[#1a3a8a] font-medium focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all flex items-center justify-between text-left shadow-sm text-sm sm:text-base"
              >
                <span className="truncate">{platforms.find(p => p.value === formData.platform)?.label || "Select Source"}</span>
                <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-[#2551AF]/60 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[110]"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 right-0 z-[120] bg-white border border-[#2551AF]/20 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden py-2 max-h-60 overflow-y-auto no-scrollbar"
                    >
                      {platforms.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, platform: p.value });
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-5 py-3 text-left text-sm font-medium transition-colors flex items-center justify-between group ${
                            formData.platform === p.value 
                              ? "bg-[#2551AF]/5 text-[#2551AF]" 
                              : "text-slate-600 hover:bg-[#2551AF]/5 hover:text-[#1a3a8a]"
                          }`}
                        >
                          {p.label}
                          {formData.platform === p.value && (
                            <Check className="w-4 h-4 text-[#2551AF]" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">Rating</label>
            <div className="flex justify-around sm:justify-start gap-2 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="transition-transform active:scale-90"
                >
                  <Star 
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${star <= formData.rating ? "fill-[#2551AF] text-[#2551AF]" : "text-[#2551AF]/30"}`} 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-2 sm:space-y-3">
            <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">Country</label>
            <div className="relative group">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2551AF]/60 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                required
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl sm:rounded-2xl text-[#1a3a8a] font-medium focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all text-sm sm:text-base"
                placeholder="e.g. United States"
              />
            </div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">Project Link (Optional)</label>
            <div className="relative group">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2551AF]/60 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl sm:rounded-2xl text-[#1a3a8a] font-medium focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all text-sm sm:text-base"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
          <Button
            type="button"
            onClick={onCancel}
            className="w-full sm:flex-1 py-5 sm:py-7 bg-white border border-[#2551AF]/20 text-slate-500 hover:text-[#1a3a8a] hover:bg-[#2551AF]/5 rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs transition-all shadow-sm order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saveStatus !== "idle"}
            className="w-full sm:flex-1 py-5 sm:py-7 bg-[#2551AF] hover:bg-[#57585f] text-white rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs shadow-xl shadow-[#2551AF]/20 transition-all active:scale-[0.98] disabled:opacity-70 order-1 sm:order-2"
          >
            {saveStatus === "saving" ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </div>
            ) : saveStatus === "success" ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Review Added
              </div>
            ) : (
              review ? "Update Review" : "Publish Review"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
