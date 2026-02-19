import { DashboardContent } from "@/components/dashboard/DashboardContent";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white relative">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" aria-hidden />
      <div className="relative z-10">
        <DashboardContent />
      </div>
    </main>
  );
}
