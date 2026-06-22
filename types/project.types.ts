// ── Admin / DB record shapes ────────────────────────────────────────────────

export type ProjectPhotoRecord = {
  id: string;
  url: string;
  alt: string | null;
  order: number;
  featured: boolean;
};

export type ProjectRecord = {
  id: string;
  title: string;
  location: string | null;
  description: string | null;
  createdAt?: Date;
  photos: ProjectPhotoRecord[];
};

export type ProjectInput = {
  title: string;
  location?: string | null;
  description?: string | null;
};

export type NewPhoto = {
  url: string;
  alt?: string | null;
};

export type Result<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

export type Upload = {
  key: string;
  name: string;
  progress: number;
  error?: boolean;
};

// ── Public-facing shapes ─────────────────────────────────────────────────────

/** A single photo shown in PhotoGrid (one project's detail page). */
export type GridPhoto = {
  url: string;
  alt?: string;
};

export type PhotoGridProps = {
  photos: GridPhoto[];
  /** Click opens a lightbox. Default true. */
  lightbox?: boolean;
};

/** A project tile in the portfolio masonry gallery. */
export type PortfolioProject = {
  id: string;
  title: string;
  location?: string | null;
  /** featured (or first) photo URL */
  cover: string;
  coverAlt?: string | null;
};

export type ProjectsGalleryProps = {
  projects: PortfolioProject[];
};
