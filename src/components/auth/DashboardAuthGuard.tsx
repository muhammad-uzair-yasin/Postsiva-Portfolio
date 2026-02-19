"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getSession, isAuthConfigured } from "@/lib/supabase/auth";

export function DashboardAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      if (!isAuthConfigured()) {
        if (!cancelled) {
          setChecking(false);
          router.replace("/postsiva/login");
        }
        return;
      }
      const session = await getSession();
      if (!cancelled) {
        setChecking(false);
        if (!session) router.replace("/postsiva/login");
      }
    }
    check();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-[#2551AF] animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
