"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Loader2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, isAuthConfigured } from "@/lib/supabase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!isAuthConfigured()) {
        setError("Auth not configured. Add Supabase URL and anon key to .env.");
        return;
      }
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" aria-hidden />
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2551AF]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2551AF]/8 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] border border-[#2551AF]/20 shadow-xl shadow-[rgba(37,81,175,0.1)] relative z-10"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="w-16 h-16 bg-[#2551AF] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <ShieldCheck className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-black text-[#2551AF] tracking-tighter mb-2">Welcome Back</h2>
          <p className="text-[#1a3a8a] font-medium text-sm">
            Enter your credentials to access the admin portal.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-5">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1 mb-2 block">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#2551AF]/60 group-focus-within:text-[#2551AF] transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-white border border-[#2551AF]/20 rounded-2xl text-[#1a3a8a] placeholder-[#2551AF]/40 focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all duration-300 font-medium"
                  placeholder="name@company.com"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <label className="text-[10px] font-black text-[#2551AF] uppercase tracking-[0.2em] ml-1 mb-2 block">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#2551AF]/60 group-focus-within:text-[#2551AF] transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-white border border-[#2551AF]/20 rounded-2xl text-[#1a3a8a] placeholder-[#2551AF]/40 focus:outline-none focus:ring-2 focus:ring-[#2551AF]/20 focus:border-[#2551AF] transition-all duration-300 font-medium"
                  placeholder="••••••••"
                />
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-600 text-xs text-center bg-red-50 py-3 rounded-xl border border-red-100 font-bold"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-7 rounded-2xl font-black text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </motion.div>
        </form>

        <div className="text-center pt-4">
          <p className="text-[10px] text-[#2551AF]/70 font-black uppercase tracking-widest">
            Secure Access Portal &copy; {new Date().getFullYear()} Postsiva Tech
          </p>
        </div>
      </motion.div>
    </div>
  );
}
