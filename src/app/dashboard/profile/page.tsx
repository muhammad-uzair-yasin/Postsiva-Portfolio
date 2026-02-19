"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProfileFormSection } from "@/components/dashboard/ProfileFormSection";
import { getCurrentProfile } from "@/lib/supabase/profile";

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    getCurrentProfile().then((p) => {
      if (p?.role !== "team_member") router.replace("/dashboard");
    });
  }, [router]);

  return (
    <main className="min-h-screen bg-[#2551AF]/5">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-[#2551AF] font-bold mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to dashboard
        </button>
        <ProfileFormSection onSaveSuccess={() => router.push("/dashboard")} />
      </div>
    </main>
  );
}
