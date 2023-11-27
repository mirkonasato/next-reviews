import { db } from './db';

export async function getComments(slug) {
  return await db.comment.findMany({
    where: { slug },
  });
}
