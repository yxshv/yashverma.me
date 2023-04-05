import type { PageLoad } from './$types';
import { unified } from "unified";
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify';
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighLight from "rehype-highlight"
import rehypeCodeTitles from "rehype-code-titles";
import remarkGFM from "remark-gfm";
import remarkEmbed from 'remark-embed';

export const load: PageLoad = async ({ fetch, params }) => {
  const slug = params['slug'];
  const res = await fetch(`/posts/${slug}.md`);
  let post = await res.text();

  let attrs: {
    title?: string;
    date?: string;
    image?: string;
    tags?: string[];
    readingTime?: string;
  } = {}

  if (post.trim().startsWith("---")) {
    const modified = post.replace("---", "");
    const [frontMatter, ...after] = modified.split("---");

    post = after.join("---")
    const attrr = frontMatter.trim().split("\n");
    attrr.forEach((attr) => {
      const [key, value] = attr.trim().split(":");
      if (key.trim() === "tags") {
        attrs["tags"] = value.trim().split(",").map((tag) => tag.trim());
        return;
      }
      attrs[key.trim() as ("title" | "date" | "image")] = value.trim();
    })
  }

  const md = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument)
    .use(remarkEmbed)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeAutolinkHeadings)
    .use(rehypeCodeTitles)
    .use(rehypeHighLight)
    .use(remarkGFM)
    .process("---" + "\n\n" + post + "\n\n" + "---")

  return {
    slug,
    attrs,
    post: md,
  };
};