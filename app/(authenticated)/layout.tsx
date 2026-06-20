import { redirect } from "next/navigation";
import { getActor } from "../lib/actions/user/getActor";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const actor = await getActor();

  if (!actor) redirect("/login");
  if (actor.role !== "ADMIN" && actor.role !== "SUPER_USER") {
    redirect("/");
  }

  return <>{children}</>;
}
