import { Navbar } from "@/components/sections/Navbar";
import { N8nWorkflows } from "@/components/sections/N8nWorkflows";
import { ContactAndFooter } from "@/components/sections/ContactAndFooter";

export const metadata = {
  title: "All n8n Workflows | Postsiva Tech",
  description: "Browse all our n8n workflow automations.",
};

export default function WorkflowsPage() {
  return (
    <main className="min-h-screen grid-bg relative">
      <div className="relative z-10">
        <Navbar />
        <N8nWorkflows fullPage />
        <ContactAndFooter />
      </div>
    </main>
  );
}
