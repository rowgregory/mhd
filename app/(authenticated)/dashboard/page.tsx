import { getDashboardStats } from "@/app/lib/actions/getDashboardStats";
import DashboardClient from "./DashboardClient";
import { getActor } from "@/app/lib/actions/getActor";

export default async function DashboardPage() {
  const [actor, res] = await Promise.all([getActor(), getDashboardStats()]);

  if (!res.success) {
    return (
      <main className="min-h-svh bg-admin-bg">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <p className="border border-danger/30 bg-danger-surface px-4 py-3 font-sans text-sm text-danger">
            {res.error}
          </p>
        </div>
      </main>
    );
  }
  const firstName = actor?.name?.trim().split(/\s+/)[0] ?? null;
  return <DashboardClient stats={res.data} name={firstName} />;
}
