"use client";

import { useState, useEffect } from "react";
import { X, Plus, Upload, Film, Loader2, Trash2, CheckCircle2 } from "lucide-react";
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

const DEFAULT_TECH = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Vue.js",
  "Laravel",
  "Django",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Tailwind CSS",
  "Firebase",
  "GraphQL",
  "Redis",
];

interface ProjectFormProps {
  project?: Project | null;
  onSave: (project: Pick<Project, "id" | "title" | "category" | "description" | "image" | "media" | "tech" | "duration">) => void;
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
  });

  const [techInput, setTechInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");
  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        tech: project.tech || [],
        media: project.media || [],
      });
    }
  }, [project]);

  const handleAddTech = () => {
    if (techInput.trim() && !formData.tech.includes(techInput.trim())) {
      setFormData({
        ...formData,
        tech: [...formData.tech, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTech = (t: string) => {
    setFormData({
      ...formData,
      tech: formData.tech.filter((item) => item !== t),
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.set("file", file);
      form.set("type", type);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!data.success || !data.url) {
        setUploading(false);
        return;
      }
      const url = data.url;
      if (type === "image" && !formData.image) {
        setFormData((prev) => ({
          ...prev,
          image: url,
          media: [...prev.media, { type, url }],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          media: [...prev.media, { type, url }],
        }));
      }
    } finally {
      setUploading(false);
    }
    e.target.value = "";
  };

  const removeMedia = (index: number) => {
    const newMedia = [...formData.media];
    const removedItem = newMedia.splice(index, 1)[0];
    
    let newImage = formData.image;
    if (removedItem.url === formData.image) {
      const nextImage = newMedia.find(m => m.type === "image")?.url || "";
      newImage = nextImage;
    }
    
    setFormData({ ...formData, media: newMedia, image: newImage });
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
          <p className="text-slate-500 font-medium text-sm mt-1">Fill in the details for your success story.</p>
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
          <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">Executive Summary</label>
          <textarea
            required
            rows={5}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-5 py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-2xl text-[#1a3a8a] font-medium focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all resize-none"
            placeholder="A brief overview of the technical achievements..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">Development Timeline</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-5 py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-2xl text-[#1a3a8a] font-medium focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all"
              placeholder="e.g. Q1 - Q3 2025"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1">Core Tech Stack</label>
            <p className="text-[10px] text-[#1a3a8a]/60 ml-1 mb-2">Click to add, or type your own below.</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {DEFAULT_TECH.filter((t) => !formData.tech.includes(t)).map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setFormData((f) => ({ ...f, tech: [...f.tech, tech] }))}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#2551AF]/10 text-[#2551AF] border border-[#2551AF]/20 hover:bg-[#2551AF]/20 transition-all"
                >
                  + {tech}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTech())}
                className="flex-1 px-5 py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-2xl text-[#1a3a8a] font-medium focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all"
                placeholder="Or add custom technology..."
              />
              <Button type="button" onClick={handleAddTech} className="bg-[#2551AF] text-white hover:bg-[#57585f] rounded-2xl p-4 shadow-lg shadow-[#2551AF]/20 transition-all">
                <Plus className="w-6 h-6" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <AnimatePresence>
                {formData.tech.map((t) => (
                  <motion.span 
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="px-4 py-2 bg-[#2551AF]/10 text-[#2551AF] border border-[#2551AF]/20 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2"
                  >
                    {t}
                    <button type="button" onClick={() => removeTech(t)} className="hover:text-red-500 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1 block">Digital Assets (Multimedia)</label>
            <p className="text-xs text-[#1a3a8a]/60 mt-1 ml-1">Add images (screenshots, logos) and videos (demos, walkthroughs) for this project. Both appear in the project gallery.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <AnimatePresence>
              {formData.media.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative aspect-video rounded-2xl overflow-hidden border border-[#2551AF]/20 bg-[#2551AF]/5 group shadow-sm"
                    >
                      {item.type === "video" ? (
                        <video src={item.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <Image src={item.url} alt="Project media" fill className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      )}
                      <button
                        type="button"
                        onClick={() => removeMedia(idx)}
                        className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-md hover:bg-red-500 hover:text-white rounded-xl text-red-500 transition-all opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 shadow-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/80 backdrop-blur-md rounded text-[8px] text-[#2551AF] uppercase font-black tracking-widest border border-[#2551AF]/15">
                        {item.type}
                      </div>
                    </motion.div>
              ))}
            </AnimatePresence>
            
            <label className="cursor-pointer aspect-video rounded-2xl border-2 border-dashed border-[#2551AF]/20 hover:border-[#2551AF]/50 hover:bg-[#2551AF]/5 transition-all flex flex-col items-center justify-center gap-2 group">
              <div className="p-3 bg-[#2551AF]/5 rounded-2xl group-hover:bg-[#2551AF]/10 transition-all text-[#2551AF]/60 group-hover:text-[#2551AF]">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#2551AF]/60 group-hover:text-[#2551AF]">Image</span>
              <span className="text-[9px] text-[#1a3a8a]/50">JPG, PNG · max 10MB</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "image")} />
            </label>

            <label className="cursor-pointer aspect-video rounded-2xl border-2 border-dashed border-[#2551AF]/20 hover:border-[#2551AF]/50 hover:bg-[#2551AF]/5 transition-all flex flex-col items-center justify-center gap-2 group">
              <div className="p-3 bg-[#2551AF]/5 rounded-2xl group-hover:bg-[#2551AF]/10 transition-all text-[#2551AF]/60 group-hover:text-[#2551AF]">
                <Film className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#2551AF]/60 group-hover:text-[#2551AF]">Video</span>
              <span className="text-[9px] text-[#1a3a8a]/50">MP4, WebM · max 100MB</span>
              <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileUpload(e, "video")} />
            </label>
          </div>
          
          <AnimatePresence>
            {uploading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 text-[#2551AF] text-xs font-black uppercase tracking-widest bg-[#2551AF]/5 p-4 rounded-2xl border border-[#2551AF]/15"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing multimedia assets...
              </motion.div>
            )}
          </AnimatePresence>
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
