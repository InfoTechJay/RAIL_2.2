import { Disclaimer } from "@/components/Disclaimer";
import { SectionHeader } from "@/components/SectionHeader";
import { AdminDashboard } from "@/components/AdminDashboard";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Admin"
        title="Asset data administration"
        description="A basic dashboard for adding, editing, and deleting asset records before replacing mock state with authenticated Prisma-backed admin operations."
      />
      <AdminDashboard />
      <div className="mt-6">
        <Disclaimer compact />
      </div>
    </main>
  );
}
