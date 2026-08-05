import type { PageServerLoad } from './$types';
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
import type { Plugin } from 'unified';

const remarkEmbedPlugin = remarkEmbed as unknown as Plugin;

export const load: PageServerLoad = async ({ fetch, params }) => {
	const slug = params.slug;
	let res: Response;
	try {
		res = await fetch(`/posts/${slug}.md`);
	} catch {
		return {
			fourOfour: true,
		};
	}

	if (res.status === 404) {
		return {
			fourOfour: true,
		};
	}

	let post = await res.text();

	let attrs: {
		title?: string;
		date?: string;
		image?: string;
		tags?: string[];
	} = {}

	if (post.trim().startsWith("---")) {
		const modified = post.replace("---", "");
		const [frontMatter, ...after] = modified.split("---");

		post = after.join("---")
		const frontMatterLines = frontMatter.trim().split("\n");
		frontMatterLines.forEach((frontMatterLine) => {
			const [key, value] = frontMatterLine.trim().split(":");
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
		.use(remarkEmbedPlugin)
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
		post: String(md),
	};
};
