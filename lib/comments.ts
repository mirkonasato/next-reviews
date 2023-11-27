import { db } from './db';

export async function getComments(slug: string) {
  return await db.comment.findMany({
    where: { slug },
  });
}
