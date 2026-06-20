export const photoSelect = {
  id: true,
  url: true,
  alt: true,
  order: true,
  featured: true,
} as const;

export const projectSelect = {
  id: true,
  title: true,
  location: true,
  description: true,
  photos: { select: photoSelect, orderBy: { order: "asc" } as const },
} as const;
