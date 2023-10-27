import { readdir, readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import qs from 'qs';

export interface Review {
  slug: string;
  title: string;
  date: string;
  image: string;
  body: string;
}

export async function getFeaturedReview(): Promise<Review> {
  const reviews = await getReviews();
  return reviews[0];
}

export async function getReview(slug: string): Promise<Review> {
  const text = await readFile(`./content/reviews/${slug}.md`, 'utf8');
  const { content, data: { title, date, image } } = matter(text);
  const body = marked(content);
  return { slug, title, date, image, body };
}

/*
    slug: 'hellblade',
    title: 'Hellblade',
    date: '2023-05-06',
    image: '/images/hellblade.jpg',
*/
export async function getReviews(): Promise<Review[]> {
  const url = 'http://localhost:1337/api/reviews?'
    + qs.stringify({
      fields: ['slug', 'title', 'subtitle', 'publishedAt'],
      populate: { image: { fields: ['url'] } },
      sort: ['publishedAt:desc'],
      pagination: { pageSize: 6 },
    }, { encodeValuesOnly: true });
  console.log('getReviews:', url);
  const response = await fetch(url);
  const { data } = await response.json();
  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}

export async function getSlugs(): Promise<string[]> {
  const files = await readdir('./content/reviews');
  return files.filter((file) => file.endsWith('.md'))
    .map((file) => file.slice(0, -'.md'.length));
}
