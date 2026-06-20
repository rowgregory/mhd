import { getActor } from "@/app/lib/actions/user/getActor";
import { listAdmins } from "@/app/lib/actions/user";
import UsersClient from "./UsersClient";

export default async function UsersPage() {
  const [actor, res] = await Promise.all([getActor(), listAdmins()]);

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

  return (
    <UsersClient
      initial={res.data}
      currentUserId={actor?.id ?? ""}
      isSuperUser={actor?.role === "SUPER_USER"}
    />
  );
}
