"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  UploadCloud,
  Star,
  Trash2,
  Loader2,
  Save,
} from "lucide-react";
import { uploadFileToFirebase } from "@/app/lib/utils/firebase.utils";
import Picture from "@/app/components/ui/Picture";
import type {
  ProjectPhotoRecord,
  ProjectRecord,
  Upload,
} from "@/types/project.types";
import {
  addProjectPhotos,
  deleteProjectPhoto,
  setFeaturedPhoto,
  updateProject,
} from "@/app/lib/actions/project";

export default function ProjectEditorClient({
  project,
}: {
  project: ProjectRecord;
}) {
  const [title, setTitle] = useState(project.title);
  const [location, setLocation] = useState(project.location ?? "");
  const [description, setDescription] = useState(project.description ?? "");
  const [photos, setPhotos] = useState<ProjectPhotoRecord[]>(project.photos);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const fileInput = useRef<HTMLInputElement>(null);

  const saveDetails = () => {
    setError(null);
    setSavedMsg(null);
    startTransition(async () => {
      const res = await updateProject(project.id, {
        title,
        location,
        description,
      });
      if (!res.success) {
        setError(res.error);
        return;
      }
      setSavedMsg("Saved");
    });
  };

  const onFilesPicked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    // reset the input so the same file can be re-picked later
    e.target.value = "";
    setError(null);

    // seed progress rows
    const seeded: Upload[] = files.map((f, i) => ({
      key: `${Date.now()}-${i}-${f.name}`,
      name: f.name,
      progress: 0,
    }));
    setUploads((prev) => [...prev, ...seeded]);

    // upload all in parallel, each updating its own progress row
    const results = await Promise.allSettled(
      files.map((file, i) => {
        // uniquify the path so same-named files don't overwrite in Firebase
        const unique = new File(
          [file],
          `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`,
          { type: file.type },
        );
        return uploadFileToFirebase(
          unique,
          (p) =>
            setUploads((prev) =>
              prev.map((u) =>
                u.key === seeded[i].key ? { ...u, progress: p } : u,
              ),
            ),
          "image",
        );
      }),
    );

    const uploaded: { url: string }[] = [];
    results.forEach((r, i) => {
      if (r.status === "fulfilled") {
        uploaded.push({ url: r.value });
        setUploads((prev) =>
          prev.map((u) =>
            u.key === seeded[i].key ? { ...u, progress: 100 } : u,
          ),
        );
      } else {
        setUploads((prev) =>
          prev.map((u) =>
            u.key === seeded[i].key ? { ...u, error: true } : u,
          ),
        );
      }
    });

    if (uploaded.length === 0) {
      setError("All uploads failed. Please try again.");
      return;
    }

    // persist the URLs
    startTransition(async () => {
      const res = await addProjectPhotos(project.id, uploaded);
      if (!res.success) {
        setError(res.error);
        return;
      }
      setPhotos(res.data);
      // clear finished progress rows after a beat
      setTimeout(() => setUploads([]), 600);
    });
  };

  const feature = (photoId: string) => {
    // optimistic
    setPhotos((prev) =>
      prev.map((p) => ({ ...p, featured: p.id === photoId })),
    );
    startTransition(async () => {
      const res = await setFeaturedPhoto(project.id, photoId);
      if (!res.success) setPhotos(project.photos); // revert to server truth
    });
  };

  const remove = (photoId: string) => {
    if (!confirm("Remove this photo?")) return;
    const prev = photos;
    setPhotos((p) => p.filter((ph) => ph.id !== photoId));
    startTransition(async () => {
      const res = await deleteProjectPhoto(photoId);
      if (!res.success) setPhotos(prev);
    });
  };

  return (
    <main className="min-h-svh bg-admin-bg">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <Link
          href="/dashboard/projects"
          className="mb-6 inline-flex items-center gap-1.5 font-sans text-sm text-admin-fg-muted transition-colors hover:text-admin-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
        >
          <ArrowLeft size={15} strokeWidth={1.5} aria-hidden="true" />
          Projects
        </Link>

        {/* Details */}
        <h1 className="font-sans text-xl font-medium text-admin-fg">
          Edit project
        </h1>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block font-sans text-xs font-medium text-admin-fg-muted">
              Title <span className="text-admin-accent">*</span>
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="mb-1 block font-sans text-xs font-medium text-admin-fg-muted">
              Location
            </span>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="mb-1 block font-sans text-xs font-medium text-admin-fg-muted">
              Description
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`${inputCls} resize-y`}
            />
          </label>

          {error && (
            <p
              role="alert"
              className="border border-danger/30 bg-danger-surface px-3 py-2 font-sans text-xs text-danger"
            >
              {error}
            </p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={saveDetails}
              disabled={pending}
              className="inline-flex items-center gap-2 bg-admin-fg px-4 py-2 font-sans text-sm text-admin-bg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent disabled:opacity-60"
            >
              <Save size={15} strokeWidth={1.5} aria-hidden="true" />
              {pending ? "Saving…" : "Save details"}
            </button>
            {savedMsg && (
              <span className="font-sans text-sm text-admin-fg-muted">
                {savedMsg}
              </span>
            )}
          </div>
        </div>

        {/* Photos */}
        <div className="mt-12 flex items-center justify-between">
          <h2 className="font-sans text-sm font-medium text-admin-fg-muted">
            Photos ({photos.length})
          </h2>
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="inline-flex items-center gap-2 border border-admin-line bg-admin-accent/10 px-3 py-1.5 font-sans text-sm text-admin-fg transition-colors hover:border-admin-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
          >
            <UploadCloud size={16} strokeWidth={1.5} aria-hidden="true" />
            Upload photos
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            onChange={onFilesPicked}
            className="hidden"
          />
        </div>

        {/* In-flight uploads */}
        {uploads.length > 0 && (
          <ul className="mt-4 space-y-2">
            {uploads.map((u) => (
              <li
                key={u.key}
                className="flex items-center gap-3 border border-admin-line bg-admin-surface px-3 py-2"
              >
                {u.error ? (
                  <span className="font-sans text-xs text-danger">Failed</span>
                ) : (
                  <Loader2
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="shrink-0 animate-spin text-admin-fg-subtle"
                  />
                )}
                <span className="min-w-0 flex-1 truncate font-sans text-xs text-admin-fg-muted">
                  {u.name}
                </span>
                <span className="h-1 w-24 overflow-hidden bg-admin-line">
                  <span
                    className="block h-full bg-admin-accent transition-all"
                    style={{ width: `${Math.round(u.progress)}%` }}
                  />
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Grid */}
        {photos.length === 0 ? (
          <p className="mt-4 border border-admin-line bg-admin-surface px-4 py-10 text-center font-sans text-sm text-admin-fg-subtle">
            No photos yet. Upload a few to show this project off.
          </p>
        ) : (
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {photos.map((p) => (
              <li
                key={p.id}
                className="group relative overflow-hidden border border-admin-line bg-admin-bg"
              >
                <span className="relative block aspect-4/3 w-full">
                  <Picture
                    priority
                    fill
                    src={p.url}
                    alt={p.alt ?? ""}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw"
                  />
                </span>

                {p.featured && (
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 bg-admin-accent px-2 py-0.5 font-sans text-[11px] text-admin-bg">
                    <Star size={11} strokeWidth={2} aria-hidden="true" />
                    Featured
                  </span>
                )}

                {/* hover actions */}
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-1 bg-black/45 px-2 py-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => feature(p.id)}
                    disabled={pending || p.featured}
                    aria-label="Set as featured"
                    className="inline-flex h-7 w-7 items-center justify-center text-white transition-colors hover:text-admin-accent disabled:opacity-40 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Star size={15} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(p.id)}
                    disabled={pending}
                    aria-label="Remove photo"
                    className="inline-flex h-7 w-7 items-center justify-center text-white transition-colors hover:text-danger focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Trash2 size={15} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

const inputCls =
  "w-full border border-admin-line bg-admin-bg px-3 py-2 font-sans text-sm text-admin-fg outline-none transition-colors focus:border-admin-accent";
