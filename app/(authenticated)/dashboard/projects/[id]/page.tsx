import { notFound } from "next/navigation";
import ProjectEditorClient from "./ProjectEditorClient";
import { getProject } from "@/app/lib/actions/project";

export default async function ProjectEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getProject(id);

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

  if (!res.data) notFound();

  return <ProjectEditorClient project={res.data} />;
}
