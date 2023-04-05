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
  const post = await res.text();

  if (post.trim().startsWith("---")) {
    const modified = post.replace("---", "");
    const [frontMatter, ...content] = modified.split("---");
    const attrs = frontMatter.trim().split("\n");
    console.log(frontMatter, attrs)
  } else {
    console.log("no")
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
    .process(post)



  return {
    slug,
    post: md,
  };
};