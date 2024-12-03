import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

export const PostMetaSchema = z.object({
  title: z.string().default(""),
  description: z.string().optional(),
  updated_at: z.string().default(""),
  pinned: z.boolean().optional().default(false),
  pinned_order: z.number().optional().default(0),
  image_src: z.string().optional(),
  image_alt: z.string().optional(),
  github: z.string().optional(),
  link: z.string().optional(),
});
export type PostMeta = z.infer<typeof PostMetaSchema>;

export type Post = {
  slug: string;
  meta: PostMeta;
  content: string;
};

const postsDirectory = path.join(process.cwd(), "_posts");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const meta = PostMetaSchema.parse(data);

  return { slug: realSlug, meta, content };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) =>
      new Date(post1.meta.updated_at) > new Date(post2.meta.updated_at)
        ? -1
        : 1,
    );
}

export function getPinnedPosts(): Post[] {
  return getAllPosts()
    .filter((post) => post.meta.pinned)
    .sort((a, b) => (a.meta.pinned_order || 0) - (b.meta.pinned_order || 0));
}

export function getLatestPosts(): Post[] {
  return getAllPosts().filter((post) => !post.meta.pinned);
}
