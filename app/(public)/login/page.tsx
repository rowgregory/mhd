import { Suspense } from "react";
import LoginClient from "./LoginClient";
import { getActor } from "@/app/lib/actions/user/getActor";
import { redirect } from "next/navigation";

// useSearchParams() inside LoginScreen requires a Suspense boundary, or the
// whole route bails out of static rendering. The fallback
// shows while the client reads the URL params on first paint.
export default async function LoginPage() {
  const actor = await getActor();
  if (actor) {
    redirect("/dashboard");
  }

  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginClient />
    </Suspense>
  );
}

function LoginFallback() {
  return (
    <main className="grid min-h-svh place-items-center bg-surface px-4 py-12 sm:px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center">
          <span className="h-14 w-14 border-2 border-line/20" />
          <div className="mt-6 h-8 w-32 bg-surface-alt" />
          <div className="mt-3 h-4 w-48 bg-surface-alt" />
        </div>
        <div className="h-30 border border-line/15 bg-surface-alt" />
      </div>
    </main>
  );
}
