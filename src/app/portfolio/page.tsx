import { Navbar } from "@/components/sections/Navbar";
import { Portfolio } from "@/components/sections/Portfolio";
import { ContactAndFooter } from "@/components/sections/ContactAndFooter";
import { getProjects } from "@/lib/supabase/projects";

export const metadata = {
  title: "All Projects | Portfolio",
  description: "Browse all our projects and case studies.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();
  return (
    <main className="min-h-screen grid-bg relative">
      <div className="relative z-10">
        <Navbar />
        <Portfolio projects={projects} fullPage />
        <ContactAndFooter />
      </div>
    </main>
  );
}
