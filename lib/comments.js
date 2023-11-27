import { db } from './db';

export async function createComment({ slug, user, message }) {
  return await db.comment.create({
    data: { slug, user, message },
  });
}

export async function getComments(slug) {
  // simulate delay:
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return await db.comment.findMany({
    where: { slug },
    orderBy: { postedAt: 'desc' },
  });
}
