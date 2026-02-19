"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, LayoutGrid, List, LogOut, MessageSquare, Loader2, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectForm } from "./ProjectForm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/project-data";
import { getProjects, createProject, updateProject, deleteProject } from "@/lib/supabase/projects";
import { signOut, getSession } from "@/lib/supabase/auth";
import { getCurrentProfile, type Profile } from "@/lib/supabase/profile";
import { ProfileFormSection } from "./ProfileFormSection";

export function DashboardContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [userId, setUserId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const router = useRouter();

  const loadProjects = async (uid: string | null, p: Profile | null | undefined) => {
    setLoading(true);
    setError(null);
    try {
      const list = await getProjects(
        p?.role === "team_member" && uid ? { userId: uid, role: p.role } : undefined
      );
      setProjects(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const session = await getSession();
      const p = await getCurrentProfile();
      if (cancelled) return;
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      setProfile(p ?? null);
      if (uid) loadProjects(uid, p ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const cats = projects.map(p => p.category);
    return ["All", ...Array.from(new Set(cats))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterCategory === "All" || p.category === filterCategory;
      return matchesSearch && matchesFilter;
    });
  }, [projects, searchQuery, filterCategory]);

  const handleSaveProject = async (
    project: Pick<Project, "id" | "title" | "category" | "description" | "image" | "media" | "tech" | "duration">
  ) => {
    try {
      if (editingProject) {
        const merged: Project = {
          ...editingProject,
          title: project.title,
          category: project.category,
          description: project.description,
          image: project.image,
          media: project.media,
          tech: project.tech,
          duration: project.duration,
        };
        await updateProject(merged);
      } else {
        await createProject({
          title: project.title,
          category: project.category,
          description: project.description,
          fullDescription: project.description,
          image: project.image,
          media: project.media,
          tech: project.tech,
          duration: project.duration,
          features: [],
          results: [],
          featured: false,
          ownerId: profile?.role === "team_member" && userId ? userId : undefined,
        });
      }
      await loadProjects(userId, profile);
      setIsFormOpen(false);
      setEditingProject(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      await loadProjects();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/postsiva/login");
  };

  return (
    <div className="min-h-screen bg-transparent text-[#1a3a8a] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#2551AF] rounded-xl shadow-lg shadow-[#2551AF]/20">
                <User className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-[#1a3a8a]">Profile</h1>
            </div>
            <p className="text-[#1a3a8a]/80 font-medium">Your profile and projects.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 w-full md:w-auto"
          >
            {profile?.role === "team_member" && (
              <Button
                onClick={() => document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" })}
                variant="outline"
                className="flex-1 md:flex-none rounded-2xl py-6 font-bold transition-all shadow-sm"
              >
                <User className="w-4 h-4 mr-2" />
                My profile
              </Button>
            )}
            <Button 
                onClick={() => router.push("/dashboard/reviews")}
                variant="outline"
                className="flex-1 md:flex-none rounded-2xl py-6 font-bold transition-all shadow-sm"
            >
                <MessageSquare className="w-4 h-4 mr-2" />
                Reviews
            </Button>
            <Button 
                onClick={handleLogout}
                variant="outline"
                className="flex-1 md:flex-none rounded-2xl py-6 font-bold transition-all shadow-sm"
            >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
            </Button>
          </motion.div>
        </header>

        {/* Profile section first (team members only) */}
        <ProfileFormSection />

        {/* Projects section at the end */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#2551AF]/10 rounded-xl">
            <Briefcase className="w-5 h-5 text-[#2551AF]" />
          </div>
          <h2 className="text-2xl font-black text-[#1a3a8a]">Projects</h2>
        </div>

        {/* Filters and Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-[#2551AF]/20 rounded-4xl p-4 sm:p-6 mb-10 shadow-xl shadow-[rgba(37,81,175,0.08)]"
        >
          <div className="flex flex-col lg:flex-row gap-6 justify-between">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2551AF]/60 w-5 h-5 group-focus-within:text-[#2551AF] transition-colors" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-2xl text-[#1a3a8a] placeholder-[#2551AF]/50 focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all font-medium"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-2xl p-1.5 overflow-x-auto no-scrollbar max-w-full">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      filterCategory === cat ? "bg-[#2551AF] text-white shadow-lg shadow-[#2551AF]/20" : "text-[#1a3a8a]/80 hover:text-[#1a3a8a] hover:bg-[#2551AF]/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-1 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-2xl p-1.5 shrink-0">
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
        </motion.div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Content Area */}
        <main>
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-10 h-10 text-[#2551AF] animate-spin" />
              </div>
            ) : filteredProjects.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-[#2551AF]/20 shadow-sm"
              >
                <div className="w-24 h-24 bg-[#2551AF]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-[#2551AF]/30" />
                </div>
                <h3 className="text-2xl font-black mb-2 tracking-tighter text-[#1a3a8a]">No Results Found</h3>
                <p className="text-[#1a3a8a]/80 font-medium">Refine your search parameters and try again.</p>
              </motion.div>
            ) : viewMode === "grid" ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
              >
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-[2.5rem] overflow-hidden border border-[#2551AF]/15 hover:border-[#2551AF]/30 transition-all duration-500 flex flex-col h-full shadow-xl shadow-[rgba(37,81,175,0.08)] relative"
                  >
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-5 left-5 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#2551AF] shadow-sm">
                        {project.category}
                      </div>
                      
                      {/* Floating Actions */}
                      <div className="absolute top-5 right-5 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <button 
                          onClick={() => {
                            setEditingProject(project);
                            setIsFormOpen(true);
                          }}
                          className="p-3 bg-white text-[#2551AF] rounded-2xl hover:bg-[#2551AF] hover:text-white shadow-2xl transition-all transform hover:scale-110"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-3 bg-red-50 text-red-600 backdrop-blur-md border border-red-100 rounded-2xl hover:bg-red-600 hover:text-white shadow-2xl transition-all transform hover:scale-110"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-2xl font-black mb-4 tracking-tight text-[#1a3a8a] group-hover:text-[#2551AF] transition-colors">{project.title}</h3>
                      <p className="text-[#1a3a8a]/80 font-medium line-clamp-2 mb-6 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-[#2551AF]/10 flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map(t => (
                          <span key={t} className="px-3 py-1.5 bg-[#2551AF]/5 rounded-xl text-[10px] font-black uppercase tracking-wider text-[#1a3a8a]/80 border border-[#2551AF]/15">
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-3 py-1.5 bg-[#2551AF]/5 rounded-xl text-[10px] font-black text-[#2551AF] border border-[#2551AF]/15">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-[2.5rem] border border-[#2551AF]/20 overflow-hidden shadow-xl shadow-[rgba(37,81,175,0.08)]"
              >
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left min-w-[900px]">
                    <thead>
                      <tr className="border-b border-[#2551AF]/15 text-[#2551AF] text-[10px] uppercase font-black tracking-[0.2em] bg-[#2551AF]/5/50">
                        <th className="px-8 py-6">Project Name</th>
                        <th className="px-8 py-6">Classification</th>
                        <th className="px-8 py-6">Timeline</th>
                        <th className="px-8 py-6">Core Technologies</th>
                        <th className="px-8 py-6 text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2551AF]/10">
                      {filteredProjects.map((project) => (
                        <tr key={project.id} className="hover:bg-[#2551AF]/5/80 transition-all group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-5">
                              <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-md border border-[#2551AF]/20">
                                <Image src={project.image} alt={project.title} fill className="object-cover" />
                              </div>
                              <div>
                                <div className="font-black text-[#1a3a8a] group-hover:text-[#2551AF] transition-colors">{project.title}</div>
                                <div className="text-[10px] text-[#2551AF]/60 font-bold uppercase mt-1">ID: #{project.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-[10px] px-4 py-1.5 bg-[#2551AF]/5 rounded-full text-[#2551AF] border border-[#2551AF]/20 font-black uppercase tracking-widest">{project.category}</span>
                          </td>
                          <td className="px-8 py-6 text-sm text-[#1a3a8a]/80 font-black uppercase tracking-tight italic">{project.duration}</td>
                          <td className="px-8 py-6">
                            <div className="flex flex-wrap gap-2">
                              {project.tech.slice(0, 2).map(t => (
                                <span key={t} className="text-[10px] text-[#1a3a8a]/80 font-black uppercase">{t}</span>
                              ))}
                              {project.tech.length > 2 && <span className="text-[10px] text-[#2551AF] font-black">+{project.tech.length - 2}</span>}
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => {
                                  setEditingProject(project);
                                  setIsFormOpen(true);
                                }}
                                className="p-3 bg-slate-100 hover:bg-[#2551AF] hover:text-white rounded-xl text-[#1a3a8a]/80 transition-all shadow-sm"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteProject(project.id)}
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

        <div className="mt-10 flex justify-center">
          <Button
            onClick={() => {
              setEditingProject(null);
              setIsFormOpen(true);
            }}
            className="font-black px-8 py-6 rounded-2xl flex items-center gap-2 shadow-xl transition-all active:scale-[0.98]"
          >
            <Plus className="w-5 h-5" />
            New Project
          </Button>
        </div>
      </div>

      {/* Modern Form Overlay */}
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
              className="relative z-10 w-full max-w-4xl max-h-full overflow-hidden"
            >
              <ProjectForm
                project={editingProject}
                onSave={handleSaveProject}
                onCancel={() => setIsFormOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
