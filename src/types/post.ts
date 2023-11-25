export type Post = {
  id: string;
  slug: string;
  title: string;
  categories: string[];
  cover: string | null;
  date: string;
  published: boolean;
  lastEditedAt: Date;
};
