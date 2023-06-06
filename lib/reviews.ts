import { readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface Review {
  title: string;
  date: string;
  image: string;
  body: string;
}

export async function getReview(slug: string): Promise<Review> {
  const text = await readFile(`./content/reviews/${slug}.md`, 'utf8');
  const { content, data: { title, date, image } } = matter(text);
  const body = marked(content, { headerIds: false, mangle: false });
  return { title, date, image, body };
}
