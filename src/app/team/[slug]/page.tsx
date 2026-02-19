"use client";

import { useEffect, useState } from "react";
import { allTeamMembers } from "@/lib/team-data";
import { getProfileByTeamSlug } from "@/lib/supabase/profile";
import { motion } from "framer-motion";
import {
  Linkedin,
  Mail,
  Download,
  ArrowLeft,
  Award,
  Code,
  CheckCircle2,
  Users,
  ExternalLink,
  Loader2,
  Briefcase,
  Github,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

type Cert = {
  name: string;
  issuer?: string;
  year?: string;
  image?: string;
  link?: string;
};

type TeamMemberDisplay = {
  slug: string;
  name: string;
  role: string;
  yearsOfExperience: string;
  fullDescription: string;
  image: string;
  skills: string[];
  bulletPoints: string[];
  certificates: Cert[];
  cvLink: string;
  socials: {
    linkedin?: string;
    email?: string;
    phone?: string;
    github?: string;
  };
};

function profileDataToMember(
  slug: string,
  d: Record<string, unknown>,
): TeamMemberDisplay {
  return {
    slug,
    name: (d.name as string) ?? "",
    role: (d.role as string) ?? "",
    yearsOfExperience: (d.yearsOfExperience as string) ?? "",
    fullDescription: (d.fullDescription as string) ?? "",
    image: (d.image as string) ?? "",
    skills: Array.isArray(d.skills) ? (d.skills as string[]) : [],
    bulletPoints: Array.isArray(d.bulletPoints)
      ? (d.bulletPoints as string[])
      : [],
    certificates: Array.isArray(d.certificates)
      ? (d.certificates as Cert[])
      : [],
    cvLink: (d.cvLink as string) ?? "",
    socials: (d.socials as TeamMemberDisplay["socials"]) ?? {},
  };
}

export default function TeamProfilePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [member, setMember] = useState<TeamMemberDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setNotFound(true);
      return;
    }
    getProfileByTeamSlug(slug)
      .then((profile) => {
        if (profile?.profile_data && typeof profile.profile_data === "object") {
          setMember(
            profileDataToMember(
              slug,
              profile.profile_data as Record<string, unknown>,
            ),
          );
        } else {
          const staticMember = allTeamMembers.find((m) => m.slug === slug);
          if (staticMember) {
            setMember({
              slug: staticMember.slug,
              name: staticMember.name,
              role: staticMember.role,
              yearsOfExperience: "",
              fullDescription: staticMember.fullDescription,
              image: staticMember.image,
              skills: staticMember.skills,
              bulletPoints: staticMember.bulletPoints,
              certificates: staticMember.certificates,
              cvLink: staticMember.cvLink,
              socials: staticMember.socials,
            });
          } else {
            setNotFound(true);
          }
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white relative flex items-center justify-center">
        <div
          className="absolute inset-0 grid-bg pointer-events-none z-0"
          aria-hidden
        />
        <Navbar />
        <div className="relative z-10 flex items-center justify-center py-32">
          <Loader2 className="w-10 h-10 text-[#2551AF] animate-spin" />
        </div>
      </main>
    );
  }

  if (notFound || !member) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-4xl font-bold">Profile not found</h1>
        <Link href="/" className="text-[#2551AF] hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white relative">
      <div
        className="absolute inset-0 grid-bg pointer-events-none z-0"
        aria-hidden
      />
      <Navbar />
      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#2551AF] font-bold mb-12 hover:gap-3 transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Team
          </button>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              {/* Left Column: Image and Socials */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/3"
              >
                <div className="sticky top-32">
                  <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl mb-8 ring-8 ring-white bg-[#2551AF]/10">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#2551AF]/30 text-4xl font-black">
                        {member.name.charAt(0) ?? "?"}
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-4xl p-8 border border-[#2551AF]/20 shadow-lg">
                    <h3 className="text-xl font-black text-[#2551AF] mb-6 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Connect with me
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {member.socials.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 rounded-2xl bg-white border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF] hover:text-white transition-all shadow-sm"
                        >
                          <Linkedin className="w-6 h-6" />
                        </a>
                      )}
                      {member.socials.github && (
                        <a
                          href={member.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 rounded-2xl bg-white border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF] hover:text-white transition-all shadow-sm"
                        >
                          <Github className="w-6 h-6" />
                        </a>
                      )}
                      {member.socials.email && (
                        <a
                          href={`mailto:${member.socials.email}`}
                          className="w-14 h-14 rounded-2xl bg-white border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF] hover:text-white transition-all shadow-sm"
                        >
                          <Mail className="w-6 h-6" />
                        </a>
                      )}
                      {member.socials.phone && (
                        <a
                          href={`https://wa.me/${member.socials.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 rounded-2xl bg-white border border-[#2551AF]/20 flex items-center justify-center text-[#2551AF] hover:bg-[#2551AF] hover:text-white transition-all shadow-sm"
                        >
                          <FaWhatsapp className="w-6 h-6" />
                        </a>
                      )}
                    </div>

                    {member.cvLink && (
                      <a
                        href={member.cvLink}
                        download
                        className="w-full mt-8 py-4 bg-[#2551AF] text-white rounded-2xl font-black text-center shadow-xl hover:bg-white hover:text-[#2551AF] hover:border-2 hover:border-[#2551AF] hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                      >
                        <Download className="w-5 h-5" />
                        Download Resume
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Details */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:w-2/3"
              >
                <div className="mb-10">
                  <h1 className="text-4xl sm:text-6xl font-black text-[#2551AF] mb-4 tracking-tighter">
                    {member.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <span className="inline-block px-6 py-2 rounded-full bg-[#2551AF]/10 text-[#2551AF] font-black text-sm uppercase tracking-widest border border-[#2551AF]/20">
                      {member.role}
                    </span>
                    {member.yearsOfExperience && (
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2551AF]/5 text-[#2551AF] font-bold text-sm border border-[#2551AF]/20">
                        <Briefcase className="w-4 h-4" />
                        {member.yearsOfExperience}{" "}
                        {Number(member.yearsOfExperience) === 1
                          ? "year"
                          : "years"}{" "}
                        of experience
                      </span>
                    )}
                  </div>
                  <p className="text-xl sm:text-2xl text-[#2551AF]/80 leading-relaxed font-medium">
                    {member.fullDescription}
                  </p>
                </div>

                <hr className="border-[#2551AF]/10 my-12" />

                {/* Key Highlights */}
                {member.bulletPoints.length > 0 && (
                  <div className="mb-16">
                    <h3 className="text-2xl font-black text-[#2551AF] mb-8 flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6" />
                      Key Highlights
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {member.bulletPoints.map((point, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-4 rounded-3xl bg-white border border-[#2551AF]/15"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#2551AF] mt-2 shrink-0" />
                          <span className="text-[#2551AF] font-bold">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                <div className="mb-16">
                  <h3 className="text-2xl font-black text-[#2551AF] mb-8 flex items-center gap-3">
                    <Code className="w-6 h-6" />
                    Skills & Expertise
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {member.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-6 py-3 rounded-2xl bg-white border border-[#2551AF]/20 text-[#2551AF] font-bold text-base shadow-sm hover:border-[#2551AF]/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certificates */}
                <div className="mb-16">
                  <h3 className="text-2xl font-black text-[#2551AF] mb-8 flex items-center gap-3">
                    <Award className="w-6 h-6" />
                    Certifications
                  </h3>

                  {member.certificates.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {member.certificates.map((cert, i) => (
                        <div
                          key={i}
                          className="group/cert relative bg-white border border-[#2551AF]/20 rounded-4xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
                        >
                          <div className="relative aspect-video w-full overflow-hidden bg-[#2551AF]/5">
                            {cert.image ? (
                              <Image
                                src={cert.image}
                                alt={cert.name}
                                fill
                                className="object-contain transition-transform duration-700 group-hover/cert:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#2551AF]/20">
                                <Award className="w-12 h-12" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover/cert:bg-black/10 transition-colors duration-500" />
                          </div>
                          <div className="p-6 flex flex-col grow">
                            <div className="mb-4">
                              <h4 className="text-lg font-black text-[#2551AF] leading-tight mb-1 group-hover/cert:text-[#1a3a8a] transition-colors line-clamp-2">
                                {cert.name}
                              </h4>
                              {cert.issuer && (
                                <p className="text-sm text-[#2551AF]/60 font-bold uppercase tracking-wider">
                                  {cert.issuer}
                                </p>
                              )}
                            </div>
                            <div className="mt-auto">
                              <a
                                href={cert.link || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-black text-[#2551AF] hover:text-[#1a3a8a] group/link transition-colors"
                              >
                                <span>View Certificate</span>
                                <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white border border-dashed border-[#2551AF]/30 rounded-4xl p-10 sm:p-16 text-center group"
                      >
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                          <Award className="w-10 h-10 text-[#2551AF]/20" />
                        </div>
                        <h4 className="text-2xl font-black text-[#2551AF] mb-4">
                          Professional Certifications
                        </h4>
                        <p className="text-[#2551AF]/60 font-medium max-w-md mx-auto leading-relaxed">
                          Currently focusing on hands-on project excellence and
                          technical innovation. New professional certifications
                          are in progress and will be updated here once
                          officially verified.
                        </p>
                      </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
