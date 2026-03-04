import { remark } from "remark";
import gfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export async function renderMarkdown(markdown: string): Promise<{
  html: string;
  toc: TocItem[];
}> {
  const toc = buildToc(markdown);
  const processed = await remark()
    .use(gfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdown);
  return {
    html: processed.toString(),
    toc
  };
}

function buildToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];

  for (const line of lines) {
    // H2
    if (line.startsWith("## ")) {
      const text = line.replace(/^##\s+/, "").trim();
      const id = slugger.slug(text);
      toc.push({ id, text, level: 2 });
    }
    // H3
    if (line.startsWith("### ")) {
      const text = line.replace(/^###\s+/, "").trim();
      const id = slugger.slug(text);
      toc.push({ id, text, level: 3 });
    }
  }

  return toc;
}


