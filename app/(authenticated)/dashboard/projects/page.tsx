import { listProjects } from "@/app/lib/actions/project/listProjects";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const res = await listProjects();

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

  return <ProjectsClient initial={res.data} />;
}
