"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Loader2,
  Save,
  Upload,
  User,
  FileText,
  Linkedin,
  Github,
  Mail,
  Phone,
  MessageCircle,
  Award,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getCurrentProfile,
  updateMyProfile,
  type Profile,
} from "@/lib/supabase/profile";

type Socials = {
  linkedin?: string;
  github?: string;
  whatsapp?: string;
  email?: string;
  phone?: string;
};
type Certificate = {
  name: string;
  issuer?: string;
  year?: string;
  image?: string;
  link?: string;
};
type ProfileData = {
  name?: string;
  role?: string;
  yearsOfExperience?: string;
  description?: string;
  fullDescription?: string;
  image?: string;
  skills?: string[];
  cvLink?: string;
  socials?: Socials;
  certificates?: Certificate[];
  bulletPoints?: string[];
};

const SOCIAL_FIELDS: {
  key: keyof Socials;
  icon: React.ReactNode;
  placeholder: string;
}[] = [
  {
    key: "linkedin",
    icon: <Linkedin className="w-5 h-5" />,
    placeholder: "https://linkedin.com/in/...",
  },
  {
    key: "github",
    icon: <Github className="w-5 h-5" />,
    placeholder: "https://github.com/...",
  },
  {
    key: "whatsapp",
    icon: <MessageCircle className="w-5 h-5" />,
    placeholder: "+1234567890 or wa.me/...",
  },
  {
    key: "email",
    icon: <Mail className="w-5 h-5" />,
    placeholder: "you@example.com",
  },
  {
    key: "phone",
    icon: <Phone className="w-5 h-5" />,
    placeholder: "+1234567890",
  },
];

interface ProfileFormSectionProps {
  /** After save (e.g. redirect). If not set, stays on page. */
  onSaveSuccess?: () => void;
}

export function ProfileFormSection({ onSaveSuccess }: ProfileFormSectionProps) {
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [form, setForm] = useState<ProfileData>({});
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [uploadingCertIndex, setUploadingCertIndex] = useState<number | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const certImageInputRef = useRef<HTMLInputElement>(null);
  const [certUploadIndex, setCertUploadIndex] = useState<number | null>(null);
  useEffect(() => {
    getCurrentProfile().then((p) => {
      setProfile(p ?? null);
      if (p?.profile_data && typeof p.profile_data === "object") {
        const d = p.profile_data as Record<string, unknown>;
        setForm({
          name: (d.name as string) ?? "",
          role: (d.role as string) ?? "",
          yearsOfExperience: (d.yearsOfExperience as string) ?? "",
          description: (d.description as string) ?? "",
          fullDescription: (d.fullDescription as string) ?? "",
          image: (d.image as string) ?? "",
          skills: Array.isArray(d.skills) ? (d.skills as string[]) : [],
          cvLink: (d.cvLink as string) ?? "",
          socials: (d.socials as Socials) ?? {},
          certificates: Array.isArray(d.certificates)
            ? (d.certificates as Certificate[])
            : [],
          bulletPoints: Array.isArray(d.bulletPoints)
            ? (d.bulletPoints as string[])
            : [],
        });
      }
    });
  }, []);

  const uploadFile = async (file: File, type: "image" | "document") => {
    const fd = new FormData();
    fd.set("file", file);
    fd.set("type", type);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!data.success || !data.url)
      throw new Error(data.error || "Upload failed");
    return data.url;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    setError(null);
    try {
      const url = await uploadFile(file, "image");
      setForm((f) => ({ ...f, image: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCv(true);
    setError(null);
    try {
      const url = await uploadFile(file, "document");
      setForm((f) => ({ ...f, cvLink: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "CV upload failed");
    } finally {
      setUploadingCv(false);
      e.target.value = "";
    }
  };

  const handleCertImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    const index = certUploadIndex;
    if (!file || index === null) return;
    setUploadingCertIndex(index);
    setCertUploadIndex(null);
    setError(null);
    try {
      const url = await uploadFile(file, "image");
      setForm((f) => ({
        ...f,
        certificates: (f.certificates ?? []).map((c, i) =>
          i === index ? { ...c, image: url } : c,
        ),
      }));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Certificate image upload failed",
      );
    } finally {
      setUploadingCertIndex(null);
      e.target.value = "";
    }
  };

  const triggerCertImageUpload = (index: number) => {
    setCertUploadIndex(index);
    certImageInputRef.current?.click();
  };

  const updateCertificate = (index: number, patch: Partial<Certificate>) => {
    setForm((f) => ({
      ...f,
      certificates: (f.certificates ?? []).map((c, i) =>
        i === index ? { ...c, ...patch } : c,
      ),
    }));
  };

  const addCertificate = () => {
    setForm((f) => ({
      ...f,
      certificates: [...(f.certificates ?? []), { name: "" }],
    }));
  };

  const removeCertificate = (index: number) => {
    setForm((f) => ({
      ...f,
      certificates: (f.certificates ?? []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setError(null);
    try {
      await updateMyProfile({
        ...profile.profile_data,
        name: form.name,
        role: form.role,
        yearsOfExperience: form.yearsOfExperience,
        description: form.description,
        fullDescription: form.fullDescription,
        image: form.image,
        skills: form.skills ?? [],
        cvLink: form.cvLink,
        socials: form.socials ?? {},
        certificates: form.certificates ?? [],
        bulletPoints: (form.bulletPoints ?? []).filter(Boolean),
      });
      onSaveSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (profile === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-[#2551AF] animate-spin" />
      </div>
    );
  }

  if (profile === null || profile.role !== "team_member") {
    return null;
  }

  const skillsStr = (form.skills ?? []).join(", ");

  return (
    <section id="profile" className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#2551AF] flex items-center justify-center text-white">
          <User className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1a3a8a]">
          My profile
        </h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-[1.5rem] border border-[#2551AF]/15 p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black text-[#2551AF] uppercase tracking-widest mb-6">
            Basic info
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#2551AF]/80 uppercase tracking-wider mb-2">
                Name
              </label>
              <input
                value={form.name ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full px-4 py-3.5 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl text-[#1a3a8a] focus:outline-none focus:ring-2 focus:ring-[#2551AF]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2551AF]/80 uppercase tracking-wider mb-2">
                Role / title
              </label>
              <input
                value={form.role ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, role: e.target.value }))
                }
                className="w-full px-4 py-3.5 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl text-[#1a3a8a] focus:outline-none focus:ring-2 focus:ring-[#2551AF]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2551AF]/80 uppercase tracking-wider mb-2">
                Years of experience
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const n = Math.max(
                      0,
                      (parseInt(form.yearsOfExperience ?? "0", 10) || 0) - 1,
                    );
                    setForm((f) => ({ ...f, yearsOfExperience: String(n) }));
                  }}
                  className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#2551AF]/10 border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF]/20 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  disabled={
                    (parseInt(form.yearsOfExperience ?? "0", 10) || 0) <= 0
                  }
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  min={0}
                  value={form.yearsOfExperience ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === "" || /^\d+$/.test(v))
                      setForm((f) => ({ ...f, yearsOfExperience: v }));
                  }}
                  placeholder="0"
                  className="w-24 px-4 py-3.5 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl text-[#1a3a8a] text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[#2551AF]/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    const n =
                      (parseInt(form.yearsOfExperience ?? "0", 10) || 0) + 1;
                    setForm((f) => ({ ...f, yearsOfExperience: String(n) }));
                  }}
                  className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#2551AF]/10 border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF]/20 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2551AF]/80 uppercase tracking-wider mb-2">
                Short description
              </label>
              <textarea
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={2}
                className="w-full px-4 py-3.5 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl text-[#1a3a8a] focus:outline-none focus:ring-2 focus:ring-[#2551AF]/30 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2551AF]/80 uppercase tracking-wider mb-2">
                Full description
              </label>
              <textarea
                value={form.fullDescription ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fullDescription: e.target.value }))
                }
                placeholder="Shown on your public team profile page"
                rows={5}
                className="w-full px-4 py-3.5 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl text-[#1a3a8a] focus:outline-none focus:ring-2 focus:ring-[#2551AF]/30 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2551AF]/80 uppercase tracking-wider mb-2">
                Key highlights
              </label>
              <p className="text-xs text-[#1a3a8a]/60 mb-2">
                Shown on your public team profile page.
              </p>
              <div className="space-y-2">
                {(form.bulletPoints ?? []).map((point, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      value={point}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          bulletPoints: (f.bulletPoints ?? []).map((p, i) =>
                            i === index ? e.target.value : p,
                          ),
                        }))
                      }
                      placeholder="e.g. Developing Agentic AI systems at Cartlow"
                      className="flex-1 px-4 py-3 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl text-[#1a3a8a] text-sm focus:outline-none focus:ring-2 focus:ring-[#2551AF]/30"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          bulletPoints: (f.bulletPoints ?? []).filter(
                            (_, i) => i !== index,
                          ),
                        }))
                      }
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      bulletPoints: [...(f.bulletPoints ?? []), ""],
                    }))
                  }
                  className="flex items-center gap-2 text-sm font-bold text-[#2551AF] hover:text-[#1a3a8a]"
                >
                  <Plus className="w-4 h-4" />
                  Add highlight
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2551AF]/80 uppercase tracking-wider mb-2">
                Skills (comma-separated)
              </label>
              <input
                value={skillsStr}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    skills: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  }))
                }
                className="w-full px-4 py-3.5 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl text-[#1a3a8a] focus:outline-none focus:ring-2 focus:ring-[#2551AF]/30"
                placeholder="React, Next.js, TypeScript"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] border border-[#2551AF]/15 p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black text-[#2551AF] uppercase tracking-widest mb-6">
            Profile photo
          </h3>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-28 h-28 rounded-2xl overflow-hidden bg-[#2551AF]/10 border-2 border-[#2551AF]/20 shrink-0">
              {form.image ? (
                <Image
                  src={form.image}
                  alt="Profile"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#2551AF]/40">
                  <User className="w-12 h-12" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                ref={imageInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.gif"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => imageInputRef.current?.click()}
                disabled={uploadingImage}
                className="rounded-xl font-bold"
              >
                {uploadingImage ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" /> Upload image
                  </>
                )}
              </Button>
              <p className="text-xs text-[#1a3a8a]/60 mt-2">
                JPG, PNG or WebP. Max 10MB.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] border border-[#2551AF]/15 p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black text-[#2551AF] uppercase tracking-widest mb-6 flex items-center gap-2">
            <FileText className="w-4 h-4" /> CV / Resume
          </h3>
          <div className="space-y-4">
            <input
              ref={cvInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleCvUpload}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => cvInputRef.current?.click()}
              disabled={uploadingCv}
              className="rounded-xl font-bold"
            >
              {uploadingCv ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" /> Upload PDF
                </>
              )}
            </Button>
            <p className="text-xs text-[#1a3a8a]/60">
              PDF only. Max 5MB. Or paste a link below.
            </p>
            <input
              value={form.cvLink ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, cvLink: e.target.value }))
              }
              placeholder="Or paste CV / resume link"
              className="w-full px-4 py-3.5 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl text-[#1a3a8a] focus:outline-none focus:ring-2 focus:ring-[#2551AF]/30"
            />
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] border border-[#2551AF]/15 p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black text-[#2551AF] uppercase tracking-widest mb-6 flex items-center gap-2">
            <Award className="w-4 h-4" /> Certificates
          </h3>
          <p className="text-xs text-[#1a3a8a]/60 mb-4">
            Add certificates with a title and optional image or link.
          </p>
          <div className="space-y-4">
            {(form.certificates ?? []).map((cert, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-[#2551AF]/20 bg-[#2551AF]/5 space-y-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs font-bold text-[#2551AF]/80">
                    Certificate {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCertificate(index)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  value={cert.name}
                  onChange={(e) =>
                    updateCertificate(index, { name: e.target.value })
                  }
                  placeholder="Certificate title (e.g. Crash Course on Python)"
                  className="w-full px-4 py-3 bg-white border border-[#2551AF]/20 rounded-xl text-[#1a3a8a] focus:outline-none focus:ring-2 focus:ring-[#2551AF]/30"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    value={cert.issuer ?? ""}
                    onChange={(e) =>
                      updateCertificate(index, { issuer: e.target.value })
                    }
                    placeholder="Issuer (e.g. Google, Coursera)"
                    className="w-full px-4 py-3 bg-white border border-[#2551AF]/20 rounded-xl text-[#1a3a8a] text-sm focus:outline-none focus:ring-2 focus:ring-[#2551AF]/30"
                  />
                  <input
                    value={cert.year ?? ""}
                    onChange={(e) =>
                      updateCertificate(index, { year: e.target.value })
                    }
                    placeholder="Year (e.g. 2024)"
                    className="w-full px-4 py-3 bg-white border border-[#2551AF]/20 rounded-xl text-[#1a3a8a] text-sm focus:outline-none focus:ring-2 focus:ring-[#2551AF]/30"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => triggerCertImageUpload(index)}
                    disabled={uploadingCertIndex === index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#2551AF]/20 text-[#2551AF] text-xs font-bold hover:bg-[#2551AF]/10 transition-colors"
                  >
                    {uploadingCertIndex === index ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    {cert.image ? "Change image" : "Upload image"}
                  </button>
                  <input
                    value={cert.link ?? ""}
                    onChange={(e) =>
                      updateCertificate(index, { link: e.target.value })
                    }
                    placeholder="Verification link (optional)"
                    className="flex-1 min-w-[180px] px-4 py-2.5 bg-white border border-[#2551AF]/20 rounded-xl text-[#1a3a8a] text-sm focus:outline-none focus:ring-2 focus:ring-[#2551AF]/30"
                  />
                </div>
                {cert.image && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#2551AF]/10">
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
            <input
              ref={certImageInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              className="hidden"
              onChange={handleCertImageUpload}
            />
            <button
              type="button"
              onClick={addCertificate}
              className="flex items-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-[#2551AF]/30 text-[#2551AF] font-bold text-sm hover:bg-[#2551AF]/5 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add certificate
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] border border-[#2551AF]/15 p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black text-[#2551AF] uppercase tracking-widest mb-6">
            Social & contact
          </h3>
          <div className="space-y-4">
            {SOCIAL_FIELDS.map(({ key, icon, placeholder }) => (
              <div key={key} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2551AF]/10 flex items-center justify-center text-[#2551AF] shrink-0">
                  {icon}
                </div>
                <input
                  value={form.socials?.[key] ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      socials: { ...f.socials, [key]: e.target.value },
                    }))
                  }
                  placeholder={placeholder}
                  className="flex-1 px-4 py-3.5 bg-[#2551AF]/5 border border-[#2551AF]/20 rounded-xl text-[#1a3a8a] focus:outline-none focus:ring-2 focus:ring-[#2551AF]/30"
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={saving}
          className="w-full py-6 rounded-2xl font-black text-base shadow-lg"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            <>
              <Save className="w-5 h-5 mr-2 inline" /> Save profile
            </>
          )}
        </Button>
      </form>
    </section>
  );
}
