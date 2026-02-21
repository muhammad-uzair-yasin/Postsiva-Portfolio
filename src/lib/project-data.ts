export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  media: { type: "image" | "video"; url: string }[];
  features: string[];
  duration: string;
  tech: string[];
  featured?: boolean;
  results: string[];
  client?: string;
  liveLink?: string;
  githubLink?: string;
  /** Set when project is owned by a team member; null for legacy or admin-created. */
  ownerId?: string | null;
};
