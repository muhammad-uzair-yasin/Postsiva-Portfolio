import { Navbar } from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { Team } from "@/components/sections/Team";
import { Portfolio } from "@/components/sections/Portfolio";
import { Certificates } from "@/components/sections/Certificates";
import { TestimonialsAndFAQ } from "@/components/sections/TestimonialsAndFAQ";
import { ContactAndFooter } from "@/components/sections/ContactAndFooter";
import { getProjects } from "@/lib/supabase/projects";

export default async function Home() {
  const projects = await getProjects();
  return (
    <main className="min-h-screen grid-bg relative">
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <Services />
        <TechStack />
        <Team />
        <Portfolio projects={projects} />
        <Certificates />
        <TestimonialsAndFAQ />
        <ContactAndFooter />
      </div>
    </main>
  );
}
