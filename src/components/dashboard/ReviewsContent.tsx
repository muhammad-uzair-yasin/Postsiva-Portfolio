"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Edit2, Trash2, Star, Globe, MessageSquare, Briefcase, List, LayoutGrid, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewForm } from "./ReviewForm";
import { useRouter } from "next/navigation";
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

const initialReviews: Review[] = [
  {
    id: 1,
    text: "Powerful tools for file management, communication, and performance insights",
    author: "Client from Fiverr",
    rating: 5,
    platform: "Fiverr",
    country: "United States",
    link: "https://fiverr.com"
  },
  {
    id: 2,
    text: "Great simplified prompting counterintuitively on the discard.",
    author: "Client from Upwork",
    rating: 5,
    platform: "Upwork",
    country: "United Kingdom",
    link: "https://upwork.com"
  }
];

export function ReviewsContent() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const router = useRouter();

  const platforms = useMemo(() => {
    return [
      { label: "All", value: "All" },
      { label: "Fiverr", value: "Fiverr" },
      { label: "Upwork", value: "Upwork" },
      { label: "Direct", value: "Direct Client" },
      { label: "LinkedIn", value: "LinkedIn" },
      { label: "Referral", value: "Referral" }
    ];
  }, []);

  const filteredReviews = useMemo(() => {
    return reviews.filter(r => {
      const matchesSearch = r.author.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterPlatform === "All" || r.platform === filterPlatform;
      return matchesSearch && matchesFilter;
    });
  }, [reviews, searchQuery, filterPlatform]);

  const handleSaveReview = (review: Review) => {
    if (editingReview) {
      setReviews(reviews.map(r => r.id === review.id ? review : r));
    } else {
      setReviews([review, ...reviews]);
    }
    setIsFormOpen(false);
    setEditingReview(null);
  };

  const handleDeleteReview = (id: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1a3a8a] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#2551AF] rounded-xl shadow-lg shadow-[#2551AF]/20">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-[#1a3a8a]">Reviews</h1>
            </div>
            <p className="text-[#1a3a8a]/80 font-medium">Manage and showcase client feedback from all platforms.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 w-full md:w-auto"
          >
            <Button 
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="flex-1 md:flex-none bg-white border-[#2551AF]/20 text-[#1a3a8a] hover:text-[#1a3a8a] hover:bg-[#2551AF]/5 rounded-2xl py-6 font-bold transition-all shadow-sm"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Projects
            </Button>
            <Button 
              onClick={() => {
                setEditingReview(null);
                setIsFormOpen(true);
              }}
              className="flex-1 md:flex-none bg-[#2551AF] hover:bg-[#57585f] text-white font-black px-8 py-6 rounded-2xl flex items-center gap-2 shadow-xl shadow-[#2551AF]/20 transition-all active:scale-[0.98]"
            >
              <Plus className="w-5 h-5" />
              Add Review
            </Button>
          </motion.div>
        </header>

        {/* Filters and Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-[#2551AF]/20 rounded-3xl sm:rounded-4xl p-4 sm:p-6 mb-10 shadow-xl shadow-[rgba(37,81,175,0.08)]"
        >
          <div className="flex flex-col xl:flex-row gap-6 justify-between">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2551AF]/60 w-5 h-5 group-focus-within:text-[#2551AF] transition-colors" />
              <input
                type="text"
                placeholder="Search reviews by client, text or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-2xl text-[#1a3a8a] placeholder-[#2551AF]/50 focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all font-medium"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex items-center gap-1 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-2xl p-1.5 overflow-x-auto no-scrollbar max-w-full lg:max-w-[500px] xl:max-w-none">
                {platforms.map(p => (
                  <button
                    key={p.value}
                    onClick={() => setFilterPlatform(p.value)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      filterPlatform === p.value ? "bg-[#2551AF] text-white shadow-lg shadow-[#2551AF]/20" : "text-[#1a3a8a]/80 hover:text-[#1a3a8a] hover:bg-[#2551AF]/10"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center justify-between sm:justify-start gap-1 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-2xl p-1.5 shrink-0">
                <span className="sm:hidden text-[10px] font-black uppercase tracking-[0.2em] text-[#2551AF]/60 ml-3">View</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-white text-[#2551AF] shadow-md shadow-[rgba(37,81,175,0.08)]" : "text-[#2551AF]/60 hover:text-[#1a3a8a]"}`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-white text-[#2551AF] shadow-md shadow-[rgba(37,81,175,0.08)]" : "text-[#2551AF]/60 hover:text-[#1a3a8a]"}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <main>
          <AnimatePresence mode="wait">
            {filteredReviews.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-24 bg-white rounded-[2rem] sm:rounded-[3rem] border border-dashed border-[#2551AF]/20 shadow-sm"
              >
                <div className="w-24 h-24 bg-[#2551AF]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-10 h-10 text-[#2551AF]/30" />
                </div>
                <h3 className="text-2xl font-black mb-2 tracking-tighter text-[#1a3a8a]">No Reviews Found</h3>
                <p className="text-[#1a3a8a]/80 font-medium px-6">Try adjusting your filters or add a new review.</p>
              </motion.div>
            ) : viewMode === "grid" ? (
              <motion.div 
                key="grid"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
              >
                {filteredReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 border border-[#2551AF]/15 hover:border-[#2551AF]/30 transition-all duration-500 flex flex-col h-full shadow-xl shadow-[rgba(37,81,175,0.08)] relative"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-[#2551AF] text-[#2551AF]" : "text-[#2551AF]/20"}`} />
                        ))}
                      </div>
                      <div className="px-3 py-1 bg-[#2551AF]/5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#2551AF] border border-[#2551AF]/15">
                        {platforms.find(p => p.value === review.platform)?.label || review.platform}
                      </div>
                    </div>

                    <div className="relative mb-8 flex-1">
                      <Quote className="absolute -top-4 -left-4 w-8 h-8 text-[#2551AF]/10 -z-10" />
                      <p className="text-[#1a3a8a] font-medium italic leading-relaxed text-sm sm:text-base">
                        &quot;{review.text}&quot;
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#2551AF]/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#2551AF]/10 flex items-center justify-center text-[#2551AF] font-black text-xs shrink-0">
                          {review.author[0]}
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-sm text-[#1a3a8a] truncate">{review.author}</div>
                          <div className="flex items-center gap-1 text-[10px] text-[#2551AF]/60 font-bold uppercase truncate">
                            <Globe className="w-3 h-3" />
                            {review.country}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => {
                            setEditingReview(review);
                            setIsFormOpen(true);
                          }}
                          className="p-2 bg-[#2551AF]/5 text-[#2551AF] rounded-xl hover:bg-[#2551AF] hover:text-white transition-all shadow-sm"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteReview(review.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-[#2551AF]/20 overflow-hidden shadow-xl shadow-[rgba(37,81,175,0.08)]"
              >
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left min-w-[800px]">
                    <thead>
                      <tr className="border-b border-[#2551AF]/15 text-[#2551AF] text-[10px] uppercase font-black tracking-[0.2em] bg-[#2551AF]/5/50">
                        <th className="px-8 py-6">Client / Source</th>
                        <th className="px-8 py-6">Rating</th>
                        <th className="px-8 py-6">Review Content</th>
                        <th className="px-8 py-6">Country</th>
                        <th className="px-8 py-6 text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2551AF]/10">
                      {filteredReviews.map((review) => (
                        <tr key={review.id} className="hover:bg-[#2551AF]/5/80 transition-all group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-[#2551AF]/5 border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] font-black text-xs">
                                {review.author[0]}
                              </div>
                              <div>
                                <div className="font-black text-[#1a3a8a] text-sm">{review.author}</div>
                                <div className="text-[10px] text-[#2551AF] font-black uppercase tracking-wider">
                                  {platforms.find(p => p.value === review.platform)?.label || review.platform}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-[#2551AF] text-[#2551AF]" : "text-[#2551AF]/20"}`} />
                              ))}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-[#1a3a8a]/80 font-medium text-xs line-clamp-1 italic">&quot;{review.text}&quot;</p>
                          </td>
                          <td className="px-8 py-6">
                            <span 
                              title={review.country}
                              className="text-[10px] px-3 py-1.5 bg-[#2551AF]/5 rounded-full text-[#1a3a8a]/80 border border-[#2551AF]/20 font-black uppercase tracking-widest inline-block max-w-[120px] truncate"
                            >
                              {review.country}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => {
                                  setEditingReview(review);
                                  setIsFormOpen(true);
                                }}
                                className="p-3 bg-[#2551AF]/10 hover:bg-[#2551AF] hover:text-white rounded-xl text-[#1a3a8a]/80 transition-all shadow-sm"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteReview(review.id)}
                                className="p-3 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl text-red-600 transition-all shadow-sm"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Form Overlay */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#2551AF]/20 backdrop-blur-xl" 
              onClick={() => setIsFormOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-2xl max-h-full overflow-hidden"
            >
              <ReviewForm
                review={editingReview}
                onSave={handleSaveReview}
                onCancel={() => setIsFormOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
