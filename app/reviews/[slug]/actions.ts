'use server';

import type { CreateCommentData } from '@/lib/comments';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createComment } from '@/lib/comments';

export async function createCommentAction(formData: FormData) {
  if (!formData.get('user')) {
    return { isError: true, message: 'Name field is required' };
  }
  const data: CreateCommentData = {
    slug: formData.get('slug') as string,
    user: formData.get('user') as string,
    message: formData.get('message') as string,
  };
  const comment = await createComment(data);
  console.log('created:', comment);
  revalidatePath(`/reviews/${data.slug}`);
  redirect(`/reviews/${data.slug}`);
}
