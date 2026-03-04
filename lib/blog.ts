import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogCluster = "reverse-vat" | "country-basics" | "use-cases";

export type BlogFrontmatter = {
  title: string;
  slug: string;
  description: string;
  date: string;
  cluster: BlogCluster;
  readingTime: string;
  canonical: string;
  faq: { question: string; answer: string }[];
  relatedSlugs?: string[];
};

export type BlogPost = BlogFrontmatter & {
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readAllMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"));
}

export type BlogPostMeta = Omit<BlogPost, "content">;

function readPostFile(filePath: string, includeContent: boolean): BlogPost {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;
  return {
    ...fm,
    content: includeContent ? content : ""
  };
}

export function getAllPosts(): BlogPost[] {
  const files = readAllMarkdownFiles();
  const posts = files.map((file) =>
    readPostFile(path.join(BLOG_DIR, file), true)
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostMetas(): BlogPostMeta[] {
  const files = readAllMarkdownFiles();
  const posts = files.map((file) => {
    const post = readPostFile(path.join(BLOG_DIR, file), false);
    // Strip content for meta list
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...meta } = post;
    return meta;
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readPostFile(filePath, true);
}

export function getPostsByCluster(cluster: BlogCluster): BlogPost[] {
  return getAllPosts().filter((post) => post.cluster === cluster);
}

export function searchPosts(query: string): BlogPost[] {
  const q = query.trim().toLowerCase();
  if (!q) return getAllPosts();
  return getAllPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q)
  );
}


