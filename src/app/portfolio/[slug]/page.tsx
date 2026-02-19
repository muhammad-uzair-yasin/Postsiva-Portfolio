import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/supabase/projects";
import { CaseStudyContent } from "@/components/portfolio/CaseStudyContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyContent project={project} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return { title: `${project.title} | Portfolio` };
}
