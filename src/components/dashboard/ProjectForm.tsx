"use client";

import { useState, useEffect } from "react";
import { X, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import type { Project } from "@/lib/project-data";

const DEFAULT_CLASSIFICATIONS = [
  "Web Development",
  "Healthcare",
  "Education",
  "Mobile Development",
  "API Development",
  "Real Estate",
  "Fintech",
  "E-commerce",
  "SaaS",
  "AI / ML",
];

interface ProjectFormProps {
  project?: Project | null;
  onSave: (project: Pick<Project, "id" | "title" | "category" | "description" | "image" | "media" | "tech" | "duration" | "liveLink" | "githubLink">) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<Omit<Project, "id">>({
    title: "",
    slug: "",
    category: "",
    description: "",
    fullDescription: "",
    image: "",
    media: [],
    features: [],
    duration: "",
    tech: [],
    featured: false,
    results: [],
    client: "",
    liveLink: "",
    githubLink: "",
  });

  const [uploading, setUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");
  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        media: project.media || [],
      });
    }
  }, [project]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.set("file", file);
      form.set("type", "image");
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!data.success || !data.url) {
        setUploading(false);
        return;
      }
      const url = data.url;
      setFormData((prev) => ({
        ...prev,
        image: url,
        media: [{ type: "image" as const, url }],
      }));
    } finally {
      setUploading(false);
    }
    e.target.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("success");
      setTimeout(() => {
        onSave({
          ...formData,
          id: project?.id || Math.floor(Math.random() * 10000),
        });
      }, 800);
    }, 1200);
  };

  return (
    <div className="bg-white border border-[#2551AF]/20 rounded-[2.5rem] p-6 sm:p-12 w-full max-w-4xl mx-auto overflow-y-auto max-h-[90vh] hide-scrollbar shadow-2xl relative">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a3a8a] tracking-tighter">
            {project ? "Edit Project" : "Initiate Project"}
          </h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Add your project to the portfolio.</p>
        </div>
        <button 
          onClick={onCancel} 
          className="p-3 hover:bg-[#2551AF]/5 rounded-2xl transition-all group active:scale-90 border border-transparent hover:border-[#2551AF]/15"
        >
          <X className="w-6 h-6 text-[#2551AF]/60 group-hover:text-[#1a3a8a]" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">Title</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-5 py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-2xl text-[#1a3a8a] font-medium focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all"
              placeholder="e.g. Enterprise CRM"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">Classification</label>
            <p className="text-[10px] text-[#1a3a8a]/60 ml-1 mb-2">Select one or type your own below.</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {DEFAULT_CLASSIFICATIONS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData((f) => ({ ...f, category: cat }))}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    formData.category === cat
                      ? "bg-[#2551AF] text-white shadow-md"
                      : "bg-[#2551AF]/10 text-[#2551AF] border border-[#2551AF]/20 hover:bg-[#2551AF]/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              required
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-5 py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-2xl text-[#1a3a8a] font-medium focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all"
              placeholder="Or type custom (e.g. Fintech)"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">Description</label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-5 py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-2xl text-[#1a3a8a] font-medium focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all resize-none"
            placeholder="Brief project overview..."
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">Project image</label>
          <div className="flex items-center gap-6">
            {formData.image ? (
              <div className="relative w-40 h-24 rounded-2xl overflow-hidden border border-[#2551AF]/20 bg-[#2551AF]/5">
                <Image src={formData.image} alt="Project" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, image: "", media: [] }))}
                  className="absolute top-1 right-1 p-1.5 bg-white/90 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : null}
            <label className="cursor-pointer flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-dashed border-[#2551AF]/20 hover:border-[#2551AF]/50 hover:bg-[#2551AF]/5 transition-all">
              <Upload className="w-6 h-6 text-[#2551AF]/60" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#2551AF]/60">
                {formData.image ? "Change" : "Upload"} image
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          <AnimatePresence>
            {uploading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 text-[#2551AF] text-xs font-bold"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">GitHub link</label>
            <input
              type="url"
              value={formData.githubLink ?? ""}
              onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
              className="w-full px-5 py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-2xl text-[#1a3a8a] font-medium focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all"
              placeholder="https://github.com/..."
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">Live link</label>
            <input
              type="url"
              value={formData.liveLink ?? ""}
              onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
              className="w-full px-5 py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-2xl text-[#1a3a8a] font-medium focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            type="button"
            onClick={onCancel}
            className="flex-1 py-7 bg-white border border-[#2551AF]/20 text-slate-500 hover:text-[#1a3a8a] hover:bg-[#2551AF]/5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-sm"
          >
            Abort
          </Button>
          <Button
            type="submit"
            disabled={saveStatus !== "idle"}
            className="flex-1 py-7 bg-[#2551AF] hover:bg-[#57585f] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-[#2551AF]/20 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {saveStatus === "saving" ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Synchronizing...
              </div>
            ) : saveStatus === "success" ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Deployed
              </div>
            ) : (
              project ? "Update Specifications" : "Commit Project"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
