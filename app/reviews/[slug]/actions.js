'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createComment } from '@/lib/comments';

export async function createCommentAction(formData) {
  if (!formData.get('user')) {
    return { isError: true, message: 'Name field is required' };
  }
  const data = {
    slug: formData.get('slug'),
    user: formData.get('user'),
    message: formData.get('message'),
  };
  const comment = await createComment(data);
  console.log('created:', comment);
  revalidatePath(`/reviews/${data.slug}`);
  redirect(`/reviews/${data.slug}`);
}
