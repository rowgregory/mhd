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
