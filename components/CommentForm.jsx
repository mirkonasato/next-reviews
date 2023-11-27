import { redirect } from 'next/navigation';
import { createComment } from '@/lib/comments';

export default function CommentForm({ slug, title }) {
  async function action(formData) {
    'use server';
    const comment = await createComment({
      slug,
      user: formData.get('user'),
      message: formData.get('message'),
    });
    console.log('created:', comment);
    redirect(`/reviews/${slug}`);
  }

  return (
    <form action={action}
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded">
      <p className="pb-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <div className="flex">
        <label htmlFor="userField" className="shrink-0 w-32">
          Your name
        </label>
        <input id="userField" name="user"
          className="border px-2 py-1 rounded w-48"
        />
      </div>
      <div className="flex">
        <label htmlFor="messageField" className="shrink-0 w-32">
          Your comment
        </label>
        <textarea id="messageField" name="message"
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <button type="submit"
        className="bg-orange-800 rounded px-2 py-1 self-center
                   text-slate-50 w-32 hover:bg-orange-700">
        Submit
      </button>
    </form>
  );
}
