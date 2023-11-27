'use client';

import { useState } from 'react';
import { createCommentAction } from '@/app/reviews/[slug]/actions';

export default function CommentForm({ slug, title }) {
  const [state, setState] = useState({ loading: false, error: null });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState({ loading: true, error: null });
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await createCommentAction(formData);
    if (result?.isError) {
      setState({ loading: false, error: result });
    } else {
      form.reset();
      setState({ loading: false, error: null });
    }
  };

  return (
    <form onSubmit={handleSubmit}
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded">
      <p className="pb-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <input type="hidden" name="slug" value={slug} />
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
      {Boolean(state.error) && (
        <p className="text-red-700">{state.error.message}</p>
      )}
      <button type="submit" disabled={state.loading}
        className="bg-orange-800 rounded px-2 py-1 self-center
                   text-slate-50 w-32 hover:bg-orange-700
                   disabled:bg-slate-500 disabled:cursor-not-allowed">
        Submit
      </button>
    </form>
  );
}
