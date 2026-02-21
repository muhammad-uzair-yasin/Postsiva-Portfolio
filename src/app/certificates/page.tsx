import { Navbar } from "@/components/sections/Navbar";
import { Certificates } from "@/components/sections/Certificates";
import { ContactAndFooter } from "@/components/sections/ContactAndFooter";
import { getAllMembersCertificates } from "@/lib/landing-data";

export const metadata = {
  title: "All Certifications | Postsiva Tech",
  description: "Browse all our team certifications.",
};

export default async function CertificatesPage() {
  const certificates = await getAllMembersCertificates();
  return (
    <main className="min-h-screen grid-bg relative">
      <div className="relative z-10">
        <Navbar />
        <Certificates certificates={certificates} fullPage />
        <ContactAndFooter />
      </div>
    </main>
  );
}
